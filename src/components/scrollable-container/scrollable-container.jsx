import styles from './scrollable-container.module.css';

export default function ScrollableContainer({ ref, children, className = '' }) {
  return (
    <div
      ref={ref}
      className={`${styles.scrollableContainer} custom-scroll ${className}`}
    >
      {children}
    </div>
  );
}
