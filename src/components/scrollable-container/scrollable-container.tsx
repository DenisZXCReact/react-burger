import type { ReactNode, Ref } from 'react';

import styles from './scrollable-container.module.css';

export default function ScrollableContainer({
  ref,
  children,
  className,
}: {
  ref?: Ref<HTMLDivElement | null>;
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <div
      ref={ref}
      className={`${styles.scrollableContainer} custom-scroll ${className}`}
    >
      {children}
    </div>
  );
}
