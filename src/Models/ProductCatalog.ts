import { IProduct } from "../types";

class ProductCatalog {
    private _products: IProduct[] = []
    private _selectedProduct: IProduct | null = null
    
    constructor() {}

    set products(products: IProduct[]) {
        this._products = products
    }

    get products(): IProduct[] {
       return this._products
    }

    getProductById(id: string):IProduct | undefined {
        return this._products.find(product => product.id === id);
    }

    set selectedProduct(product: IProduct) {
        this._selectedProduct = product
    }

    get selectedProduct(): IProduct | null {
        return this._selectedProduct
    }
}

export default ProductCatalog;