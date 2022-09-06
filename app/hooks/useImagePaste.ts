import accepts from 'attr-accept';
import { useEffect, useRef } from 'react';

export interface UseImagePasteProps {
  onPaste: (file: File) => void;
  accept: string[];
}

export const useImagePaste = (props: UseImagePasteProps) => {
  const onPaste = (e: ClipboardEvent) => {
    const file = e.clipboardData?.files.item(0);
    if (!file) {
      return;
    }
    accepts(file, props.accept);
    props.onPaste(file);
  };

  const onPasteRef = useRef(onPaste);
  onPasteRef.current = onPaste;

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      onPasteRef.current(e);
    };
    document.addEventListener('paste', handler);
    return () => {
      document.removeEventListener('paste', handler);
    };
  }, []);
};
