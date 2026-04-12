import { ensureElement } from "../../utils/utils";
import {ICard, Card} from "./Card"

interface IBasketCard extends ICard {
    index: number
}

export class CardBasket extends Card<IBasketCard> {
    protected cardIndex: HTMLElement
    protected cardButton: HTMLButtonElement

    constructor(container:HTMLElement, events?: { onClick: (event: MouseEvent) => void }) {
        super(container) 
        this.cardIndex = ensureElement<HTMLElement>('.basket__item-index', container)
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', container)

        if (events?.onClick) {
            this.cardButton.addEventListener('click', events.onClick)
        }

    }

    set index(value:number) {
        this.cardIndex.textContent = String(value)
    }
}