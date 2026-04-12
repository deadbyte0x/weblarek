import { Card, ICard } from "./Card";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";

interface ICardGallery extends ICard {
image: string
category: string
}

export class CardGallery extends Card<ICardGallery> {
    protected cardImage: HTMLImageElement
    protected cardCategory: HTMLElement

    constructor(container:HTMLElement, events?: { onClick: (event: MouseEvent) => void }) {
        super(container, events)
        this.cardImage = ensureElement<HTMLImageElement>('.card__image', container)
        this.cardCategory = ensureElement<HTMLElement>('.card__category', container)

        if (events?.onClick) {
            container.addEventListener('click', events.onClick)
        }
    }

    set image(value:string) {
        this.cardImage.src = value
        this.cardImage.alt = this.title
    }

    set category(value:string) {
        const modifier = categoryMap[value as keyof typeof categoryMap];
        this.cardCategory.textContent = value
        this.cardCategory.className = `card__category ${modifier}`
    }
}