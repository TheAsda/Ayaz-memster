import { useDropzone } from 'react-dropzone';

export interface ImageDropzoneProps {
  onDrop: (file: File) => void;
}

export const ImageDropzone = (props: ImageDropzoneProps) => {
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
  });

  return (
    <div {...getRootProps()} className="border p-4 text-center">
      <input {...getInputProps()} name="file"></input>
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
