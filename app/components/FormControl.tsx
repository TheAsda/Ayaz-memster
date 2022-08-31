import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export const FormControl = (props: ComponentPropsWithoutRef<'fieldset'>) => (
  <fieldset
    {...props}
    className={clsx(props.className, 'flex flex-col gap-1')}
  />
);
