import { Image } from "./util/Image";
import { loadImage } from "./util/ImageLoader";

import DemoLower from "./assets/maps/DemoLower.png";
import DemoUpper from "./assets/maps/DemoUpper.png";

import Hero from "./assets/characters/people/hero.png";
import Shadow from "./assets/characters/shadow.png";
import { withGrid } from "./util/Grid";
import { GameCharacter } from "./objects/GameCharacter";
import { SpriteFrame } from "./util/Sprite";

export const SpriteAnimations: {[key: string]: Record<string, SpriteFrame[]>} = {
    CharacterMovement: {
        "idle-down": [[0, 0]],
        "idle-right": [[0, 1]],
        "idle-up": [[0, 2]],
        "idle-left": [[0, 3]],
        "walk-down": [[1, 0], [0, 0], [3, 0], [0, 0]],
        "walk-right": [[1, 1], [0, 1], [3, 1], [0, 1]],
        "walk-up": [[1, 2], [0, 2], [3, 2], [0, 2]],
        "walk-left": [[1, 3], [0, 3], [3, 3], [0, 3]],
    }
}

export const Maps = {
    DemoRoom: {
        gameObjects: {
            hero: new GameCharacter({
                position: {
                    x: withGrid(5),
                    y: withGrid(6)
                },
                spriteProps: {
                    image: await loadImage(Hero),
                    shadowImage: await loadImage(Shadow),
                    offset: {
                        x: -8,
                        y: -18
                    },
                    animations: SpriteAnimations.CharacterMovement,
                    currentAnimation: 'walkDown',
                },
                characterType: 'player'
            }),
        },
        imageLayers: {
            lower: new Image({
                image: await loadImage(DemoLower)
            }),
            upper: new Image({
                image: await loadImage(DemoUpper)
            })
        }
    }
};