import { clsx } from 'clsx';

import Text from '@/ui/text/text.tsx';
import { useIngredientData } from '@hooks/useIngredientData.ts';

import type { ReactNode } from 'react';

import styles from './order-ingredient-preview.module.css';

type TOrderIngredientPreviewProps = {
  ingredientId: string;
  more?: number | false;
  className?: string;
};

export default function OrderIngredientPreview({
  ingredientId,
  more,
  className,
}: TOrderIngredientPreviewProps): ReactNode {
  const { image } = useIngredientData(ingredientId);
  return (
    <div className={clsx(className, styles.preview)}>
      <div className={styles.previewImage}>
        {more && <Text className={styles.more}>+{more}</Text>}
        <img src={image} alt="ingredient" />
      </div>
    </div>
  );
}
