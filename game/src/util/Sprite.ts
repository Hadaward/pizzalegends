import { GameObject } from "../objects/GameObject";
import { loadImage } from "./ImageLoader";

export type SpriteFrame = [
    x: number,
    y: number
];

export type SpriteProps<T extends Record<string, SpriteFrame[]>> = {
    animations?: T;
    currentAnimation?: keyof T;
    currentAnimationFrame?: number;
    animationFrameLimit?: number;

    image?: HTMLImageElement;
    shadowImage?: HTMLImageElement;

    gameObject: GameObject<T>;

    /**
     * defaults to [32, 32]
     */
    spriteCuts?: [x: number, y: number];

    /**
     * This offset is used to reposition the image adding this offset coords to the gameObject coords when drawing.
     */
    offset?: {
        x?: number;
        y?: number;
    }
};

export class Sprite<T extends Record<string, SpriteFrame[]>> {
    public animationFrameProgress: number;
    public animationFrameLimit: number;

    public currentAnimationFrame: number;
    public currentAnimation: keyof T;
    public animations: T;

    public image: HTMLImageElement | null = null;
    public shadowImage: HTMLImageElement | null = null;

    public gameObject: GameObject<T>;

    public spriteCuts: [x: number, y: number];
    public offset: {x: number, y: number};

    constructor(props: SpriteProps<T>) {
        this.animationFrameLimit = props.animationFrameLimit ?? 4;
        this.animationFrameProgress = this.animationFrameLimit;

        this.currentAnimationFrame = props.currentAnimationFrame ?? 0;
        this.currentAnimation = props.currentAnimation ?? "default";
        this.animations = props.animations ?? { default: [[0, 0]] } as unknown as T;

        this.gameObject = props.gameObject;

        this.image = props.image ?? null;
        this.shadowImage = props.shadowImage ?? null;

        this.spriteCuts = props.spriteCuts ?? [32, 32];

        this.offset = {
            x: props?.offset?.x ?? 0,
            y: props?.offset?.y ?? 0
        };
    }

    async load(url: string) {
        this.image = await loadImage(url);
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    get animationFrames() {
        return this.animations[this.currentAnimation];
    }

    setAnimation(key: keyof T) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }


    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress--;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame = (this.currentAnimationFrame + 1) % this.animationFrames.length;
    }

    draw(context: CanvasRenderingContext2D) {
        const posX = this.gameObject.position.x + this.offset.x;
        const posY = this.gameObject.position.y + this.offset.y;

        if (this.shadowImage !== null) {
            context.drawImage(
                this.shadowImage,
                posX,
                posY
            );
        }

        const [frameX, frameY] = this.frame;

        if (this.image !== null) {
            context.drawImage(
                this.image,
                frameX * this.spriteCuts[0], frameY * this.spriteCuts[1],
                this.spriteCuts[0], this.spriteCuts[1],
                posX, posY,
                this.spriteCuts[0], this.spriteCuts[1]
            );
        }

        this.updateAnimationProgress();
    }
}