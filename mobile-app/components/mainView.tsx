import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Colors } from '@/constants/theme';

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
    paddingTop: 74,
    paddingHorizontal: 28,
    backgroundColor: Colors.light.background, // cream background
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  greenEclipse: {
    position: 'absolute',
    top: -210,
    left: -28,
    width: 450,
    height: 450,
    borderRadius: 360,
    backgroundColor: Colors.light.icon, // green color
    transform: [
      {scaleX: 1.2}
    ],
  },
});
