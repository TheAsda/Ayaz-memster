import { useDropzone } from 'react-dropzone';
import { useImagePaste } from '~/hooks/useImagePaste';
import { Button } from './Button';

export interface ImageDropzoneProps {
  onDrop: (file: File) => void;
}

export const ImageDropzone = (props: ImageDropzoneProps) => {
  useImagePaste({
    onPaste: props.onDrop,
    accept: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    onDrop: (acceptedFiles) => {
      props.onDrop(acceptedFiles[0]);
    },
    maxSize: 1024 * 1024 * 10,
  });

  const paste = () => {
    document.execCommand('paste');
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="border p-4 text-center cursor-pointer"
      >
        <input {...getInputProps()} name="file"></input>
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <Button className="md:hidden" type="button" onClick={paste}>
        Paste Image
      </Button>
    </>
  );
};
