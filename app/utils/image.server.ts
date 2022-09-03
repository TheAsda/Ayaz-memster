import type { Crop } from 'react-image-crop';
import sharp from 'sharp';

const toInt = (value: number) => Math.round(value);

export const getPreview = async (
  image: Buffer,
  crop: Crop,
  isAnimated = false
) => {
  return sharp(image, { animated: isAnimated })
    .extract({
      top: toInt(crop.y),
      left: toInt(crop.x),
      width: toInt(crop.width),
      height: toInt(crop.height),
    })
    .resize(300, 300)
    .webp()
    .toBuffer();
};

export const getWebp = (image: Buffer, isAnimated = false) => {
  return sharp(image, { animated: isAnimated })
    .webp({ lossless: true })
    .toBuffer();
};

export const getPng = (image: Buffer, isAnimated = false) => {
  return sharp(image, { animated: isAnimated }).png().toBuffer();
};

export const getGif = (image: Buffer, isAnimated = false) => {
  return sharp(image, { animated: isAnimated }).gif().toBuffer();
};

export const getIsAnimated = (file: File) => {
  return /gif|apng$/.test(file.type);
};
