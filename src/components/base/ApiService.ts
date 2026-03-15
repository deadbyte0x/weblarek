import { IApi, IProductsResponse, IOrderData, IOrderResponse } from '../../types';

class ApiService {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    // Получение всех товаров с сервера
    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product');
    }

    // Отправка заказа на сервер
    postOrder(orderData: IOrderData): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order', orderData);
    }
}

export default ApiService;