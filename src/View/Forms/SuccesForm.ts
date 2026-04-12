import { Component } from "../../components/base/Component";
import { ensureElement } from "../../utils/utils";

export class Succes extends Component<{total: number}> {

    protected description: HTMLElement
    protected close: HTMLButtonElement

    constructor(container:HTMLElement, events: {onClick: () => void}) {
        super(container)

        this.description = ensureElement<HTMLElement>('.order-success__description', container)
        this.close = ensureElement<HTMLButtonElement>('.order-success__close', container)

        this.close.addEventListener('click', events.onClick)
    }

    set total(value: number) {
        this.description.textContent = `Списано ${value} синапсов`
    }
}