import { Component } from "../components/base/Component";

interface IGallery {
    catalog: HTMLElement[]
}

export class Gallery extends Component<IGallery> {
    protected galleryItem: HTMLElement

    constructor(container:HTMLElement) {
        super(container)

        this.galleryItem = container
    }

    set catalog(items: HTMLElement[]) {
        this.galleryItem.replaceChildren(...items)
    }
}