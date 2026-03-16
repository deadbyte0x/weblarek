import './scss/styles.scss';
import { apiProducts } from './utils/data';
import ProductCatalog from './Models/ProductCatalog';
import ProductCart from './Models/ProductCart';
import CustomerData from './Models/CustomerData';
import { Api } from './components/base/Api';
import ApiService from './ApiService';
import { API_URL } from './utils/constants';

//PRODUCTCATALOG
console.log('%c=== ТЕСТ PRODUCTCATALOG ===', 'color: blue; font-weight: bold;');

const catalog = new ProductCatalog();

// Сохранение массива товаров
console.log('%c1. Сохранение массива товаров:', 'color: blue; font-weight: bold;');
catalog.products = apiProducts.items;
console.log('✓ Товары сохранены');

// Получение массива товаров
console.log('%c2. Получение массива товаров:', 'color: blue; font-weight: bold;');
console.log('Массив товаров из каталога:', catalog.products);

// Получение товара по ID
console.log('%c3. Получение товара по ID:', 'color: blue; font-weight: bold;');
const firstProductId = apiProducts.items[0].id;
const productById = catalog.getProductById(firstProductId);
console.log(`Товар с ID ${firstProductId}:`, productById);

// Сохранение товара для подробного отображения
console.log('%c4. Сохранение товара для подробного отображения:', 'color: blue; font-weight: bold;');
catalog.selectedProduct = apiProducts.items[1];
console.log('✓ Товар выбран:', catalog.selectedProduct);

// Получение выбранного товара
console.log('%c5. Получение выбранного товара:', 'color: blue; font-weight: bold;');
console.log('Выбранный товар:', catalog.selectedProduct);

// PRODUCTCART 
console.log('%c=== ТЕСТ PRODUCTCART ===', 'color: green; font-weight: bold;');

const cart = new ProductCart([]);

// Добавление товаров в корзину
console.log('%c1. Добавление товаров в корзину:', 'color: green; font-weight: bold;');
cart.addItem(apiProducts.items[0]); // 750
console.log('✓ Добавлен товар 1:', apiProducts.items[0].title, '(750)');
cart.addItem(apiProducts.items[1]); // 1450
console.log('✓ Добавлен товар 2:', apiProducts.items[1].title, '(1450)');
cart.addItem(apiProducts.items[3]); // 2500
console.log('✓ Добавлен товар 3:', apiProducts.items[3].title, '(2500z)');

// Получение массива товаров в корзине
console.log('%c2. Получение массива товаров в корзине:', 'color: green; font-weight: bold;');
console.log('Товары в корзине:', cart.items);

// Получение количества товаров
console.log('%c3. Получение количества товаров:', 'color: green; font-weight: bold;');
console.log('Количество товаров в корзине:', cart.getItemsCount());

// Получение общей стоимости
console.log('%c4. Получение стоимости всех товаров:', 'color: green; font-weight: bold;');
console.log('Итоговая стоимость:', cart.totalPrice);

// Проверка наличия товара по ID
console.log('%c5. Проверка наличия товара в корзине:', 'color: green; font-weight: bold;');
console.log('Товар 1 в корзине?', cart.hasProduct(apiProducts.items[0].id), '(ID:', apiProducts.items[0].id + ')');
console.log('Товар 2 в корзине?', cart.hasProduct(apiProducts.items[1].id), '(ID:', apiProducts.items[1].id + ')');
console.log('Несуществующий товар?', cart.hasProduct('fake-id'));

// Удаление товара из корзины
console.log('%c6. Удаление товара из корзины:', 'color: green; font-weight: bold;');
console.log('Удаляем товар:', apiProducts.items[1].title);
cart.removeItem(apiProducts.items[1]);
console.log('✓ Товар удалён');
console.log('Товары после удаления:', cart.items);
console.log('Новая стоимость:', cart.totalPrice,);
console.log('Товар 2 ещё в корзине?', cart.hasProduct(apiProducts.items[1].id));

// Очистка корзины
console.log('%c7. Очистка корзины:', 'color: green; font-weight: bold;');
cart.clear();
console.log('✓ Корзина очищена');
console.log('Товары в корзине:', cart.items);
console.log('Стоимость пустой корзины:', cart.totalPrice,);

// CUSTOMERDATA 
console.log('%c=== ТЕСТ CUSTOMERDATA ===', 'color: purple; font-weight: bold;');

const customer = new CustomerData();

// Сохранение данных (первый раз)
console.log('%c1. Сохранение части данных:', 'color: purple; font-weight: bold;');
customer.setData({
  payment: 'card',
  email: 'user@example.com'
});
console.log('✓ Сохранены: метод оплаты и email');
console.log('Текущие данные:', customer.getData());

// Сохранение данных (второй раз, без затирания старых)
console.log('%c2. Добавление остальных данных (без затирания):', 'color: purple; font-weight: bold;');
customer.setData({
  phone: '+7 (999) 123-45-67',
  address: 'ул. Пушкина, д. 1'
});
console.log('✓ Добавлены: телефон и адрес');
console.log('Все данные покупателя:', customer.getData());

// Получение всех данных
console.log('%c3. Получение всех данных покупателя:', 'color: purple; font-weight: bold;');
console.log('Данные:', customer.getData());

// Валидация полных данных
console.log('%c4. Валидация заполненных данных:', 'color: purple; font-weight: bold;');
let errors = customer.validate();
console.log('Ошибки:', Object.keys(errors).length === 0 ? '✓ Нет ошибок' : errors);

// Очистка данных
console.log('%c5. Очистка данных покупателя:', 'color: purple; font-weight: bold;');
customer.clear();
console.log('✓ Данные очищены');
console.log('Данные после очистки:', customer.getData());

// Валидация пустых данных
console.log('%c6. Валидация пустых данных:', 'color: purple; font-weight: bold;');
errors = customer.validate();
console.log('Ошибки (должны быть все 4 поля):', errors);

// Валидация с частичными данными
console.log('%c7. Валидация с частичными данными:', 'color: purple; font-weight: bold;');
customer.setData({
  payment: 'cash',
  email: 'test@mail.ru'
  // phone и address не установлены
});
console.log('Установлены: payment и email');
console.log('Текущие данные:', customer.getData());
errors = customer.validate();
console.log('Ошибки (должны быть phone и address):', errors);

console.log('%c=== ВСЕ ТЕСТЫ ЗАВЕРШЕНЫ ===', 'color: red; font-weight: bold;');

// ПОЛУЧЕНИЕ ТОВАРОВ С СЕРВЕРА 
console.log('%c=== ПОЛУЧЕНИЕ ТОВАРОВ С СЕРВЕРА ===', 'color: orange; font-weight: bold;');

// Инициализация API и ApiService
const api = new Api(API_URL);
const apiService = new ApiService(api);

// Создаём каталог для товаров с сервера
const serverCatalog = new ProductCatalog();

// Получаем товары с сервера
apiService.getProducts()
  .then((response) => {
    console.log('%c✓ Товары успешно получены с сервера', 'color: orange; font-weight: bold;');
    console.log('Всего товаров:', response.total);
    console.log('Товары:', response.items);
    
    // Сохраняем товары в каталог
    serverCatalog.products = response.items;
    console.log('%c✓ Товары сохранены в каталог', 'color: orange; font-weight: bold;');
    console.log('Каталог товаров:', serverCatalog.products);
  })
  .catch((error) => {
    console.error('%c✗ Ошибка при получении товаров с сервера:', 'color: red; font-weight: bold;', error);
  });

