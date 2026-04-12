import { Component } from "../../components/base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../../components/base/Events";

interface IForm {
    valid: boolean
    errors: string[]
}

export class Form<T> extends Component<IForm & T> {
    protected container: HTMLFormElement
    protected formSubmit: HTMLButtonElement
    protected formErrors: HTMLElement
    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container)
        this.container = container
        this.formSubmit = ensureElement<HTMLButtonElement>('button[type="submit"]', container)
        this.formErrors = ensureElement<HTMLElement>('.form__errors', container)

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.events.emit(`${this.container.name}.${String(field)}:change`, { field, value });
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    set valid(value:boolean) {
        this.formSubmit.disabled = !value
    }

    set errors(value:string[]) {
        this.formErrors.textContent = value.join('; ')
    }

    render(state: Partial<IForm & T>) {
        super.render(state)
        return this.container
    }
}