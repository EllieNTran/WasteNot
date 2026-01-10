import { red } from "react-native-reanimated/lib/typescript/Colors";

const tintColorLight = '#0a7ea4';
const accentColor = '#556B61';
const greyColor = '#989898';
const darkGreyColor = '#797979';
const lightBeigeColor = '#FAF9F4';
const secondaryGreenColor = '#556B61';
const redColor = '#980000'

export const Colors = {
  light: {
    text: '#000000',
    background: '#E2DED2',
    tint: tintColorLight,
    icon: '#2D403E',
    accent: accentColor,
    grey: greyColor,
    tabIconSelected: tintColorLight,
    lightBeige: lightBeigeColor,
    secondaryGreen: secondaryGreenColor,
    darkGrey: darkGreyColor,
    red: redColor
  },
  dark: {
    text: '#FFFFFF',
    background: '#2D403E',
    tint: tintColorLight,
    icon: '#E2DED2',
    accent: accentColor,
    grey: greyColor,
    tabIconSelected: tintColorLight,
  }
};
