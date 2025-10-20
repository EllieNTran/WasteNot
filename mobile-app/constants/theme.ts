/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const accentColor = '#556B61';

export const Colors = {
  light: {
    text: '#000000',
    background: '#E2DED2',
    tint: tintColorLight,
    icon: '#2D403E',
    accent: accentColor,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    background: '#2D403E',
    tint: tintColorLight,
    icon: '#E2DED2',
    accent: accentColor,
    tabIconSelected: tintColorLight,
  }
};
