export const cached: {[key: string]: HTMLImageElement} = {};

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        if (cached[url] !== undefined)
            return resolve(cached[url]);

        const image = new Image();
        image.onload = () => {
            cached[url] = image;
            resolve(image);
        }
        image.src = url;
    });
}