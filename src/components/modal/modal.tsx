import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '@components/modal/modal-overlay/modal-overlay.js';

import styles from './modal.module.css';

type TModal = ({
  title,
  children,
  onClose,
  width,
  disableClosing,
}: {
  title?: string;
  children: ReactNode;
  onClose: () => void;
  width?: number;
  disableClosing?: boolean;
}) => ReactNode;

const modalRoot = document.getElementById('react-modals');
const Modal: TModal = ({ title, children, onClose, width = 720, disableClosing }) => {
  useEffect(() => {
    function closeModal(e: KeyboardEvent): void {
      if (disableClosing) return;
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', closeModal);

    return (): void => {
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
              onClick={() => {
                if (disableClosing) return;
                onClose();
              }}
            />
          </div>
          <div className={styles.modal_content}>{children}</div>
        </div>
      </div>
    </>,
    modalRoot!
  );
};
export default Modal;
