import { Card, ICard } from "./Card"
import { ensureElement } from "../../utils/utils"
import { categoryMap } from "../../utils/constants"

export interface ICardPreview extends ICard {
    description: string;
    image: string;
    category: string;
    buttonTitle?: string;
}

export class CardPreview extends Card<ICardPreview> {
    protected cardDescription: HTMLElement
    protected cardImage: HTMLImageElement
    protected cardCategory: HTMLElement
    protected cardButton: HTMLButtonElement

    constructor(container:HTMLElement, events?: { onClick: (event: MouseEvent) => void }) {
        super(container)
        this.cardDescription = ensureElement<HTMLElement>(".card__text", container)
        this.cardImage = ensureElement<HTMLImageElement>(".card__image", container)
        this.cardCategory = ensureElement<HTMLElement>(".card__category", container)
        this.cardButton = ensureElement<HTMLButtonElement>(".card__button", container)

        if (events?.onClick) {
            this.cardButton.addEventListener('click', events.onClick)
        }
    }

    set description(value:string) {
        this.cardDescription.textContent = value
    }

    set image(value:string) {
        this.cardImage.src = value
        this.cardImage.alt = this.cardTitle?.textContent ?? ""
    }

    set category(value:string) {
        const modifier = categoryMap[value as keyof typeof categoryMap] || "";
        this.cardCategory.textContent = value
        this.cardCategory.className = `card__category ${modifier}`
    }

    set price(value: number | null) {
        super.price = value

        if (value === null) {
            this.cardButton.disabled = true
            this.cardButton.textContent = "Недоступно"
        } else {
            this.cardButton.disabled = false
        }
    }

    set buttonTitle(value:string) {
        if(this.cardButton.disabled === false) {
            this.cardButton.textContent = value
        }
    }
}