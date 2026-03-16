import styles from './modal-overlay.module.css';
export default function ModalOverlay({ onClose }) {
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
