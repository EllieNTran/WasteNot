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
    paddingTop: 72,
    paddingHorizontal: 28,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  greenEclipse: {
    position: 'absolute',
    top: -220,
    left: '50%',
    width: 450,
    height: 450,
    borderRadius: 360,
    backgroundColor: Colors.light.icon,
    transform: [
      { translateX: -225 },
      { scaleX: 1.2 },
    ],
  },
});
