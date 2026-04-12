import { IProduct } from "../types";
import { IEvents } from "../components/base/Events";

class ProductCatalog {
    private _products: IProduct[] = []
    private _selectedProduct: IProduct | null = null
    
    constructor(protected events: IEvents) {}

    set products(products: IProduct[]) {
        this._products = products
        this.events.emit('items:changed', { items: this._products });
    }

    get products(): IProduct[] {
       return this._products
    }

    getProductById(id: string):IProduct | undefined {
        return this._products.find(product => product.id === id);
    }

    setSelectedProduct(product: IProduct) {
        this._selectedProduct = product
    }

    get selectedProduct(): IProduct | null {
        return this._selectedProduct
    }
}

export default ProductCatalog;