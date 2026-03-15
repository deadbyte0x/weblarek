import { IProduct } from "../../../types";

class ProductCatalog {
    private products: IProduct[]
    private selectedProduct: IProduct | null
    constructor(products: IProduct[] = [], selectedProduct: IProduct | null = null) {
    this.products = products;
    this.selectedProduct = selectedProduct;
}

    set Products(products: IProduct[]) {
        this.products = products
    }

    get Products(): IProduct[] {
       return this.products
    }

    get ProductById(): (id: string) => IProduct | undefined {
        return (id:string) => this.products.find(product => product.id === id);
    }

    set SelectedProduct(product: IProduct) {
        this.selectedProduct = product
    }

    get SelectedProduct(): IProduct | null {
        return this.selectedProduct
    }
}

export default ProductCatalog;