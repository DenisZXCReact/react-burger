import { useDrop } from 'react-dnd';

import type { CSSProperties, ReactNode, Ref } from 'react';

import type {
  TOnDropHandler,
  TOnDropIngredient,
} from '@hooks/useDnDForBurgerIngredients.ts';

type TDropWrapperProps = {
  children: ReactNode;
  accept: string;
  onDrop: TOnDropHandler;
  onHover?: TOnDropHandler;
  customStyles?: CSSProperties;
  className?: string;
};

export default function DropWrapper({
  children,
  accept,
  onDrop,
  onHover,
  customStyles,
  className,
}: TDropWrapperProps): ReactNode {
  const [, dropRef] = useDrop({
    accept,
    hover: (item: TOnDropIngredient) => {
      if (onHover) onHover(item);
    },
    drop: (item: TOnDropIngredient) => {
      onDrop(item);
    },
  });
  return (
    <div
      className={className}
      style={customStyles}
      ref={dropRef as unknown as Ref<HTMLDivElement>}
    >
      {children}
    </div>
  );
}
