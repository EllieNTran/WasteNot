import React from 'react';
import { View, StyleSheet, ViewProps, Dimensions } from 'react-native';
import { Colors } from '@/src/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

export function MainView({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.greenEclipse} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 88,
    paddingHorizontal: 28,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  greenEclipse: {
    position: 'absolute',
    top: -245,
    alignSelf: 'center',
    width: 475,
    height: 475,
    borderRadius: 370,
    backgroundColor: Colors.light.icon,
    transform: [
      { scaleX: 1.12 },
    ],
  },
});
