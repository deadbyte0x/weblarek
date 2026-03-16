import { IProduct } from "../types";

class ProductCart {
    private _items:IProduct[] = []

    constructor() {
    }

    get items():IProduct[] {
        return this._items
    }

    addItem(product:IProduct): void {
        this._items.push(product);
    } 

    removeItem(product: IProduct): void {
        this._items = this._items.filter(item => item.id !== product.id);
    }

    clear(): void {
        this._items = []
    }

    get totalPrice(): number {
        return this._items.reduce((sum, product) => {
    if (product.price === null || product.price === undefined) {
      return sum;
    }
    return sum + product.price;
  }, 0);
    }

    getItemsCount(): number {
        return this._items.length;
    }

    hasProduct(id: string): boolean {
        return this._items.some(item => item.id === id);
    }
}

export default ProductCart