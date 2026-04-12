import { Component } from "../../components/base/Component";
import { ensureElement } from "../../utils/utils";

export interface ICard {
    title: string
    price:number | null
}

export abstract class Card<T> extends Component<T> {
    protected cardTitle: HTMLElement
    protected cardPrice: HTMLElement

    constructor(container: HTMLElement, events?: { onClick: (event: MouseEvent) => void }) {
        super(container)
        this.cardTitle = ensureElement<HTMLElement>('.card__title', container)
        this.cardPrice = ensureElement<HTMLElement>('.card__price', container)

        if (events?.onClick) {
            container.addEventListener('click', events.onClick)
        }

    }
    set title(value:string) {
        this.cardTitle.textContent = String(value)
    }
    
    set price(value:number | null) {
        this.cardPrice.textContent = value === null ? 'Бесценно' : `${value} синапсов`
    }
}