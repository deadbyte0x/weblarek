import { Component } from "../components/base/Component";
import { ensureElement } from "../utils/utils";
import { IEvents } from "../components/base/Events";

export class Basket extends Component<{items: HTMLElement[], total:number}> {
    protected list: HTMLElement
    protected basketTotal: HTMLElement
    protected basketButton:HTMLButtonElement

    constructor(container:HTMLElement, protected events: IEvents)  {
        super(container)

        this.list = ensureElement<HTMLElement>(".basket__list", container)
        this.basketTotal = ensureElement<HTMLElement>('.basket__price', container)
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', container)

        this.basketButton.addEventListener('click', () => {
            this.events.emit('order:open')
        })

        this.basketButton.disabled = true
    }

    set items(items: HTMLElement[]) {
        if (items.length > 0) {
            this.list.replaceChildren(...items)
            this.basketButton.disabled = false
        } else {
            this.list.replaceChildren()
            this.basketButton.disabled = true
        }
    }

    set total(value: number) {
        this.basketTotal.textContent = `${value} синапсов`
    }
}