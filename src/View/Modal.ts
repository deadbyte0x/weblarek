import { Component } from "../components/base/Component";
import { ensureElement } from "../utils/utils";

export class Modal extends Component<{content: HTMLElement}> {
    protected closeButton:HTMLButtonElement
    protected contentModal:HTMLElement

    constructor(container:HTMLElement) {
        super(container)
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container)
        this.contentModal = ensureElement<HTMLElement>('.modal__content', container) 

        this.closeButton.addEventListener('click', this.close.bind(this)); 
        this.container.addEventListener('click', this.close.bind(this)); 
        this.contentModal.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value:HTMLElement) {
        this.contentModal.replaceChildren(value)
    }

    open() {
        this.container.classList.add('modal_active')
    }

    close() {
        this.container.classList.remove('modal_active')
        this.contentModal.replaceChildren()
    }

    render(data: { content: HTMLElement }): HTMLElement { 
        super.render(data); 
        this.open(); 
        return this.container; 
    } 
}