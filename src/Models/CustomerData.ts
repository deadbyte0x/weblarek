import { IBuyer } from "../types";
import { IEvents } from "../components/base/Events";

class CustomerData {
    protected customer: IBuyer = {
    payment: '',
    email: '',
    phone: '',
    address: '',
    }
    
    constructor(protected events: IEvents) {
    }

    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) this.customer.payment = data.payment;
        if (data.email !== undefined) this.customer.email = data.email;
        if (data.phone !== undefined) this.customer.phone = data.phone;
        if (data.address !== undefined) this.customer.address = data.address;
        this.events.emit('buyer:changed', this.getData());
    }

    getData(): IBuyer {
        return {
            payment: this.customer.payment,
            email: this.customer.email,
            phone: this.customer.phone,
            address: this.customer.address,
        }
    }

    clear(): void {
        this.customer.payment = '';
        this.customer.email = '';
        this.customer.phone = '';
        this.customer.address = '';
    }

    validate(): Record<string, string> {
        const errors: Record<string, string> = {};

        if (!this.customer.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }

        if (!this.customer.email) {
            errors.email = 'Укажите email';
        }

        if (!this.customer.phone) {
            errors.phone = 'Укажите телефон';
        }

        if (!this.customer.address) {
            errors.address = 'Укажите адрес';
        }

        return errors;
    
    }


}

export default CustomerData