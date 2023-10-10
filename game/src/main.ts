import { Overworld } from "./overworld"
import "./style.css"

const overworld = new Overworld({
  element: document.querySelector(".game-container")!,
  canvas: document.querySelector(".game-canvas")!
});

await overworld.init();