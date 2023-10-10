import { Sprite, SpriteFrame, SpriteProps } from "../util/Sprite";

export type GameObjectMovingDirections = 'left' | 'right' | 'up' | 'down';
export type GameObjectMovingAxis = 'x' | 'y';

export type GameObjectProps<T extends Record<string, SpriteFrame[]>> = {
    position?: {
        x?: number,
        y?: number
    };

    spriteProps?: SpriteProps<T> | {[key: string]: any};
    direction?: GameObjectMovingDirections;
};

export class GameObject<T extends Record<string, SpriteFrame[]>> {
    public direction: GameObjectMovingDirections;
    public position: {x: number, y: number};
    public sprite: Sprite<any>;
    
    constructor(props: GameObjectProps<T>) {
        this.position = {
            x: props.position?.x ?? 0,
            y: props.position?.y ?? 0
        };

        this.sprite = new Sprite({
            ...props.spriteProps,
            gameObject: this
        });

        this.direction = props.direction ?? 'down';
    }

    update(_props: GameObjectProps<T>) {}
}