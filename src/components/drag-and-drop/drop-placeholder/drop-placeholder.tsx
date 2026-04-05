import { useDrop } from 'react-dnd';

import type { CSSProperties, ReactNode, Ref } from 'react';

import type {
  TOnDropHandler,
  TOnDropIngredient,
} from '@hooks/useDnDForBurgerIngredients.ts';

import styles from './drop-placeholder.module.css';

type TDropPlaceholderProps = {
  type?: 'default' | 'top' | 'bottom';
  accept: string;
  customStyles?: CSSProperties;
  className?: string;
  text: string;
  onDrop: TOnDropHandler;
};

export default function DropPlaceholder({
  type = 'default',
  accept,
  customStyles,
  className,
  text,
  onDrop,
}: TDropPlaceholderProps): ReactNode {
  const [{ hover }, dropRef] = useDrop({
    accept,
    drop: (item: TOnDropIngredient) => {
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
      ref={dropRef as unknown as Ref<HTMLDivElement>}
      style={customStyles}
    >
      {text}
    </div>
  );
}
