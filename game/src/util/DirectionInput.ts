import { Keyboard } from "@etsoo/shared";
import { GameObjectMovingDirections } from "../objects/GameObject";

export type DirectionInputProps = {
    directionMap: Record<Keyboard.Codes, GameObjectMovingDirections> | {[key: string]: GameObjectMovingDirections};
};

export class DirectionInput {
    public heldDirections: GameObjectMovingDirections[] = [];
    public directionMap: Record<Keyboard.Codes, GameObjectMovingDirections> | {[key: string]: GameObjectMovingDirections};
    
    constructor(props: DirectionInputProps) {
        this.directionMap = props.directionMap;
    }

    get direction(): GameObjectMovingDirections {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener("keydown", (evt) => {
            const direction = this.directionMap[evt.code as Keyboard.Codes];
            
            if (direction === undefined || this.heldDirections.includes(direction)) {
                return;
            }

            this.heldDirections.unshift(direction);
        });

        document.addEventListener("keyup", (evt) => {
            const direction = this.directionMap[evt.code as Keyboard.Codes];
            const index = this.heldDirections.indexOf(direction);
            
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        });
    }
}