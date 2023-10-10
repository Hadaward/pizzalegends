import { loadImage } from "./ImageLoader";

export type ImageProps = {
    image?: HTMLImageElement;
    position?: {
        x?: number,
        y?: number
    }
};

export class Image {
    public image: HTMLImageElement | null = null;
    public position: {
        x: number,
        y: number
    };

    constructor(props: ImageProps) {
        this.image = props.image ?? null;
        this.position = {
            x: props.position?.x ?? 0,
            y: props.position?.y ?? 0
        };
    }

    async load(url: string) {
        this.image = await loadImage(url);
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.image === null)
            return;

        context.drawImage(
            this.image,
            this.position.x,
            this.position.y
        );
    }
}