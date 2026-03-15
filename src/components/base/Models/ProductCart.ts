import { IProduct } from "../../../types";

class ProductCart {
    private items:IProduct[] = []

    constructor(items:IProduct[]) {
        this.items = items
    }

    get Items():IProduct[] {
        return this.items
    }

    addItems(product:IProduct): void {
        this.items.push(product);
    } 

    removeItem(product: IProduct): void {
        this.items = this.items.filter(item => item.id !== product.id);
    }

    clear(): void {
        this.items = []
    }

    get TotalPrice(): number {
        return this.items.reduce((sum, product) => {
    if (product.price === null || product.price === undefined) {
      return sum;
    }
    return sum + product.price;
  }, 0);
    }

    getItemsCount(): number {
        return this.items.length;
    }

    hasProduct(id: string): boolean {
        return this.items.some(item => item.id === id);
    }
}

export default ProductCart