import { clsx } from 'clsx';

import type { ReactNode } from 'react';

type TText = {
  size?: 'small' | 'medium' | 'large' | 'default';
  isInActive?: boolean;
  isDigits?: boolean;
  children: ReactNode;
  className?: string;
};

export default function Text({
  size = 'default',
  isDigits = false,
  isInActive = false,
  children,
  className,
}: TText): ReactNode {
  const textType = isDigits ? 'text_type_digits-' : 'text_type_main-';
  return (
    <div
      className={clsx(
        'text',
        textType + size,
        isInActive && 'text_color_inactive',
        className
      )}
    >
      {children}
    </div>
  );
}
