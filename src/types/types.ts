export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
export type TIngredientType = 'bun' | 'sauce' | 'main';
export type TIngredientWithKey = { key: string } & TIngredient;
export type TUser = {
  email: string;
  name: string;
  password?: string;
};
