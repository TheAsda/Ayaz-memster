import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

export const Input = (props: ComponentPropsWithoutRef<'input'>) => (
  <input
    {...props}
    className={clsx(props.className, 'p-1 rounded-sm border')}
  />
);
