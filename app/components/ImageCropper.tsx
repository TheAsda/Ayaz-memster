import { useEffect, useRef, useState } from 'react';
import type { Crop } from 'react-image-crop';
import ReactCrop from 'react-image-crop';

export interface ImageCropperProps {
  imageFile: File;
  onCropChange: (crop: Crop) => void;
}

export const ImageCropper = (props: ImageCropperProps) => {
  const [image, setImage] = useState<string>();
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const src = event.target?.result;
      if (src) {
        setImage(src.toString());
      }
    };
    fileReader.readAsDataURL(props.imageFile);
    return () => {
      fileReader.abort();
      setImage(undefined);
    };
  }, [props.imageFile]);

  useEffect(() => {
    if (!crop || !imageRef.current) {
      return;
    }
    const imageWidth = imageRef.current.naturalWidth;
    const imageHeight = imageRef.current.naturalHeight;
    props.onCropChange({
      x: (crop.x * imageWidth) / 100,
      y: (crop.y * imageHeight) / 100,
      width: (crop.width * imageWidth) / 100,
      height: (crop.height * imageHeight) / 100,
      unit: 'px',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crop]);

  if (!image) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <ReactCrop
        aspect={1}
        minWidth={50}
        minHeight={50}
        crop={crop}
        onChange={(_, crop) => {
          setCrop(crop);
        }}
        className="w-full"
      >
        <img
          src={image}
          alt={props.imageFile.name}
          className="w-full"
          ref={imageRef}
        />
      </ReactCrop>
    </>
  );
};
