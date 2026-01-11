import React from 'react';
import { View, StyleSheet, ViewProps, ScrollView } from 'react-native';
import { Colors } from '@/src/constants/theme';

export function MainView({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.outerContainer, style]} {...props}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.greenEclipse} />
          <View style={styles.scrollContent}>
            {children}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentWrapper: {
    paddingTop: 88,
  },
  contentContainer: {
    position: 'relative',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 20,
  },
  greenEclipse: {
    position: 'absolute',
    top: -330,
    alignSelf: 'center',
    width: 475,
    height: 475,
    borderRadius: 370,
    backgroundColor: Colors.light.icon,
    transform: [
      { scaleX: 1.12 },
    ],
    zIndex: -1,
  },
});
