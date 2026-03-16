import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '@components/modal/modal-overlay/modal-overlay.jsx';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');
export default function Modal({
  title,
  children,
  onClose,
  width = 720,
  disableClosing,
}) {
  useEffect(() => {
    function closeModal(e) {
      if (disableClosing) return;
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onClose, disableClosing]);
  return createPortal(
    <>
      <ModalOverlay
        onClose={() => {
          if (disableClosing) return;
          onClose();
        }}
      />
      <div
        className={styles.modal}
        style={{ width }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modal_container}>
          <div className={styles.modal_top}>
            <h2 className="text text_type_main-large">{title}</h2>
            <CloseIcon
              className={styles.cursor_pointer}
              type={'primary'}
              onClick={(e) => {
                e.stopPropagation();
                if (disableClosing) return;
                onClose();
              }}
            />
          </div>
          <div className={styles.modal_content}>{children}</div>
        </div>
      </div>
    </>,
    modalRoot
  );
}
