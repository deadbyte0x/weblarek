import { IProduct } from "../types";
import { IEvents } from "../components/base/Events";

class ProductCart {
    private _items:IProduct[] = []

    constructor(protected events: IEvents) {
    }

    get items():IProduct[] {
        return this._items
    }

    addItem(product:IProduct): void {
        this._items.push(product);
        this.events.emit('basket:changed');
    } 

    removeItem(product: IProduct): void {
        this._items = this._items.filter(item => item.id !== product.id);
        this.events.emit('basket:changed');
    }

    clear(): void {
        this._items = []
        this.events.emit('basket:changed');
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