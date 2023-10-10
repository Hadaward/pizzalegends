import { Maps } from "./config";
import { GameMap } from "./objects/GameMap";
import { DirectionInput } from "./util/DirectionInput";

export type OverworldProps = {
    element: HTMLDivElement;
    canvas: HTMLCanvasElement;
};

export class Overworld {
    public element: HTMLDivElement;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    
    public map: GameMap | null = null;
    public directionInput: DirectionInput | null = null;

    constructor(props: OverworldProps) {
        this.element = props.element;
        this.canvas = props.canvas;
        this.context = this.canvas.getContext("2d")!;
    }

    private step() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.map?.drawLowerLayer(this.context);

        // draw game objects here
        for (const object of Object.values(this.map?.gameObjects ?? {})) {
            object.update({
                direction: this.directionInput?.direction
            });

            object.sprite?.draw(this.context);
        }

        this.map?.drawUpperLayer(this.context);
        requestAnimationFrame(this.step.bind(this));
    }

    startGameLoop() {
        requestAnimationFrame(this.step.bind(this));
    }

    async init() {
        this.map = new GameMap(Maps.DemoRoom);
        this.directionInput = new DirectionInput({
            directionMap: {
                KeyW: 'up',
                KeyS: 'down',
                KeyD: 'right',
                KeyA: 'left',
                ArrowDown: 'down',
                ArrowUp: 'up',
                ArrowLeft: 'left',
                ArrowRight: 'right'
            }
        });

        this.directionInput.init();
        this.startGameLoop();
    }
}