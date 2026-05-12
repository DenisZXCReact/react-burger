import { useAppSelector } from '@hooks/useAppSelector.ts';
import { getIngredients } from '@services/ingredients/ingredients-slice.ts';

import type { TFeedOrder } from '@/types/types.ts';

type TUseOrderReturn = {
  totalPrice: number;
  formattedDate: string;
};

export const useOrder = (order: TFeedOrder): TUseOrderReturn => {
  console.log(order);
  const allIngredients = useAppSelector(getIngredients);

  const totalPrice = order.ingredients.reduce((sum, id) => {
    const ingredient = allIngredients.find((ing) => ing._id === id);
    return sum + (ingredient?.price ?? 0);
  }, 0);

  const date = new Date(order.createdAt);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  let day: number | string = date.getDate();
  const month = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' })
    .formatToParts(date)
    .find((p) => p.type === 'month')?.value;
  let formattedDate = '';
  if (isSameDay(date, today)) {
    day = 'Сегодня';
    formattedDate = day;
  } else if (isSameDay(date, yesterday)) {
    day = 'Вчера';
    formattedDate = day;
  } else {
    formattedDate = day + ' ' + month;
  }

  return {
    totalPrice,
    formattedDate: `${formattedDate}, ${hours}:${minutes}`,
  };
};
