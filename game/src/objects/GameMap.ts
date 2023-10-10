import { Image } from "../util/Image";
import { GameObject } from "./GameObject";

export type GameMapProps = {
    gameObjects: {[key: string]: GameObject<any>};
    imageLayers: {
        lower?: Image,
        upper?: Image
    }
};

export class GameMap {
    public gameObjects: {[key: string]: GameObject<any>};
    public imageLayers: { lower?: Image, upper?: Image };

    constructor(props: GameMapProps) {
        this.gameObjects = props.gameObjects;
        this.imageLayers = props.imageLayers;
    }

    drawLowerLayer(context: CanvasRenderingContext2D) {
        this.imageLayers.lower?.draw(context);
    }

    drawUpperLayer(context: CanvasRenderingContext2D) {
        this.imageLayers.upper?.draw(context);
    }
}