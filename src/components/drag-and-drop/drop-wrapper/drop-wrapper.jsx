import { useDrop } from 'react-dnd';

export default function DropWrapper({
  children,
  accept,
  onDrop,
  onHover,
  customStyles,
  className,
}) {
  const [, dropRef] = useDrop({
    accept,
    hover: (item) => {
      if (onHover) onHover(item);
    },
    drop: (item) => {
      onDrop(item);
    },
  });
  return (
    <div className={className} style={customStyles} ref={dropRef}>
      {children}
    </div>
  );
}
