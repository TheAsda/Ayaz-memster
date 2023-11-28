import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export const Button = (props: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        'p-1 rounded-sm bg-purple-800 text-white data-loading:bg-purple-400 data-loading:cursor-wait'
      )}
    />
  );
};
