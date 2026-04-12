import './scss/styles.scss';

// API
import ApiService from './ApiService';
import { Api } from './components/base/Api';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';

// MODELS
import ProductCatalog from './Models/ProductCatalog';
import ProductCart from './Models/ProductCart';
import CustomerData from './Models/CustomerData';


// VIEW

import { Gallery } from './View/Gallery';
import { Header } from './View/Header';
import { Modal } from './View/Modal';
import { Basket } from './View/Basket';
import { CardBasket } from './View/Card/CardBasket';
import { CardGallery } from './View/Card/CardGallery';
import { CardPreview, ICardPreview } from './View/Card/CardPreview';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Order } from './View/Forms/OrderForm';
import { Contacts } from './View/Forms/ContactsForm';
import { Succes } from './View/Forms/SuccesForm';

import { IProduct, IBuyer, IOrderResponse } from './types';

const api = new Api(API_URL)
const apiService = new ApiService(api)
const events = new EventEmitter()


const productsModel = new ProductCatalog(events)
const basketModel = new ProductCart(events)
const customerModel = new CustomerData(events)

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'))
const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const basketView = new Basket(cloneTemplate('#basket'), events);
const orderForm = new Order(cloneTemplate('#order'), events);
const contactsForm = new Contacts(cloneTemplate('#contacts'), events);

const cardPreview = new CardPreview(cloneTemplate('#card-preview'),{ onClick: () => events.emit('card:toggle-basket')})
const succesView = new Succes(cloneTemplate('#success'), {onClick: () => modal.close()})



events.on('items:changed', () => {
    gallery.catalog = productsModel.products.map(item => {
        const card = new CardGallery(cloneTemplate('#card-catalog'), {
            onClick: () => events.emit('card:select', item)
        });
        
        return card.render({
            title: item.title,
            price: item.price,
            category: item.category,
            image: CDN_URL + item.image 
        });
    });
});


events.on('basket:changed', () => {
    header.counter = basketModel.getItemsCount();
    
    const items = basketModel.items.map((item, index) => {
        const card = new CardBasket(cloneTemplate('#card-basket'), {
            onClick: () => events.emit("basket:remove-item", { id: item.id })
        });
        return card.render({
            title: item.title,
            price: item.price,
            index: index + 1
        });
    });

    basketView.render({
        items,
        total: basketModel.totalPrice
    });
});



events.on('buyer:changed', (buyer: IBuyer) => {
    const errors = customerModel.validate();
    
    const orderErrors = Object.values({ payment: errors.payment, address: errors.address })
        .filter((i): i is string => !!i);
    const contactErrors = Object.values({ email: errors.email, phone: errors.phone })
        .filter((i): i is string => !!i);

    orderForm.render({
        address: buyer.address ?? '',
        payment: (buyer.payment as string) ?? '',
        valid: !errors.payment && !errors.address,
        errors: orderErrors
    });

    contactsForm.render({
        email: buyer.email ?? '',
        phone: buyer.phone ?? '',
        valid: !errors.email && !errors.phone,
        errors: contactErrors
    });
});


events.on('card:select', (item: IProduct) => {
    productsModel.setSelectedProduct(item);
});

events.on('product:previewChanged', (item: IProduct) => {
    modal.render({
        content: cardPreview.render({
            ...item,
            image: CDN_URL + item.image,
            buttonTitle: basketModel.hasProduct(item.id)
                ? 'Удалить из корзины'
                : 'В корзину'
        } as ICardPreview)
    });
});


events.on('card:toggle-basket', () => {
    const item = productsModel.selectedProduct;
    if (item) {
        if (basketModel.hasProduct(item.id)) {
            basketModel.removeItem(item);
        } else {
            basketModel.addItem(item);
        }
        modal.close();
    }
});


events.on('payment:change', (data: { target: string }) => {
    customerModel.setData({ payment: data.target as any });
});

events.on(/^order\..*:change|^contacts\..*:change/, (data: { field: keyof IBuyer, value: string }) => {
    customerModel.setData({ [data.field]: data.value });
});

events.on('basket:open', () => {
    modal.render({ content: basketView.render({}) });
});

events.on('basket:remove-item', (data: { id: string }) => {
    const product = basketModel.items.find((item) => item.id === data.id);
    if (product) {
        basketModel.removeItem(product);
    }
});

events.on('order:open', () => {
    const data = customerModel.getData();
    const errors = customerModel.validate();
    modal.render({
        content: orderForm.render({
            address: data.address ?? '',
            payment: (data.payment as string) ?? '',
            valid: !errors.payment && !errors.address,
            errors: Object.values({ payment: errors.payment, address: errors.address }).filter((i): i is string => !!i)
        })
    });
});

events.on('order:submit', () => {
modal.render({ content: contactsForm.render({}) })
});

events.on('contacts:submit', () => {
    const orderData = {
        ...customerModel.getData(),
        total: basketModel.totalPrice,
        items: basketModel.items.map(item => item.id)
    };

    apiService.postOrder(orderData)
        .then((result: IOrderResponse) => {
            basketModel.clear();
            customerModel.clear();

            modal.render({
                content: succesView.render({
                    total: result.total
                })
            });
        })
        .catch(console.error);
});

apiService.getProducts()
    .then((items) => {
        productsModel.products = items.items;
    })
    .catch(console.error);