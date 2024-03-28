import { Area } from "react-easy-crop";

export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });

export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.translate(image.width / 2, image.height / 2);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    );

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    return new Promise<string | null>((resolve, reject) => {
        canvas.toBlob((file) => {
            resolve(file ? URL.createObjectURL(file) : null);
        }, "image/jpeg");
    });
}