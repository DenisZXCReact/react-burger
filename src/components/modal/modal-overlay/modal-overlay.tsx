import type { ReactNode } from 'react';

import styles from './modal-overlay.module.css';
export default function ModalOverlay({ onClose }: { onClose: () => void }): ReactNode {
  return (
    <div
      className={styles.modal_overlay}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    ></div>
  );
}
