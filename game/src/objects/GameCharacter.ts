import { SpriteFrame } from "../util/Sprite";
import { GameObject, GameObjectMovingAxis, GameObjectMovingDirections, GameObjectProps } from "./GameObject";

export type GameCharacterType = 'player' | 'character';

export type GameCharacterProps = {
    characterType?: GameCharacterType
};

export class GameCharacter<T extends Record<string, SpriteFrame[]>> extends GameObject<T> {
    public movingProgressRemaining: number = 0;

    private directionUpdate: Record<GameObjectMovingDirections, [axis: GameObjectMovingAxis, modifier: number]> = {
        up: ["y", -1],
        down: ["y", 1],
        left: ["x", -1],
        right: ["x", 1]
    }

    public characterType: GameCharacterType;
    
    constructor(props: GameCharacterProps & GameObjectProps<T>) {
        super(props);

        this.characterType = props.characterType ?? 'character';
    }

    updatePosition() {
        if (this.movingProgressRemaining <= 0)
            return;
        
        const [property, modifier] = this.directionUpdate[this.direction];

        this.position[property] += modifier;
        this.movingProgressRemaining--;
    }

    updateSprite(props: GameObjectProps<T>) {
        if (!props.direction && this.characterType === 'player' && this.movingProgressRemaining === 0) {
            this.sprite.setAnimation(`idle-${this.direction}`);
        }
        else
            this.sprite.setAnimation(`walk-${this.direction}`);
    }

    update(props: GameObjectProps<T>): void {
        this.updatePosition();
        this.updateSprite(props);

        if (this.movingProgressRemaining !== 0)
            return;

        if (props.direction && this.characterType === 'player') {
            this.direction = props.direction;
            this.movingProgressRemaining = 16;
        }
    }
}