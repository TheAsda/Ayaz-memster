import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export const FormLabel = (props: ComponentPropsWithoutRef<'label'>) => (
  <label {...props} className={clsx(props.className, '')} />
);
