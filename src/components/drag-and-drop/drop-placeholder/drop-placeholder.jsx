import { useDrop } from 'react-dnd';

import styles from './drop-placeholder.module.css';
export default function DropPlaceholder({
  type = 'default',
  accept,
  customStyles,
  className,
  text,
  onDrop,
}) {
  const [{ hover }, dropRef] = useDrop({
    accept,
    drop: (item) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      hover: monitor.isOver(),
    }),
  });
  const dropClass =
    type === 'top'
      ? styles.drop_place_top
      : type === 'bottom'
        ? styles.drop_place_bottom
        : styles.drop_place;
  return (
    <div
      className={`${dropClass} ${className} ${hover && styles.drop_hover} text text_type_main-default`}
      ref={dropRef}
      style={customStyles}
    >
      {text}
    </div>
  );
}
