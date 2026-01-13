import { OtherIngredient, Vegetable, Fruit, Dairy, Meat } from '@/src/assets/icons';
import { ImageSourcePropType } from 'react-native';

export const calculateDaysLeft = (expiration: string) => {
  const diffTime = new Date(expiration).getTime() - new Date().getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export const getIconForIngredientType = (type: string) => {
  let iconSource: ImageSourcePropType;

  switch (type.toLowerCase()) {
    case 'vegetables':
      iconSource = Vegetable;
      break;
    case 'fruits':
      iconSource = Fruit;
      break;
    case 'dairy':
      iconSource = Dairy;
      break;
    case 'meat':
      iconSource = Meat;
      break;
    default:
      iconSource = OtherIngredient;
  }

  return iconSource;
}
