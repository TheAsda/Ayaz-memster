import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export const FormErrorText = (props: ComponentPropsWithoutRef<'p'>) => {
  if (!props.children) {
    return null;
  }

  return (
    <p {...props} className={clsx(props.className, 'text-red-500 text-sm')} />
  );
};
