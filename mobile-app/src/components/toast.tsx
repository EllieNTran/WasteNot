import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/src/constants/theme';
import { BodyText } from '@/src/components/typography';

interface CustomToastProps {
  text1?: string;
  text2?: string;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastStyle {
  backgroundColor: string;
  textColor?: string;
  icon: string;
}

const toastStyles: Record<ToastType, ToastStyle> = {
  success: {
    backgroundColor: Colors.light.secondaryGreen,
    icon: '✓',
  },
  error: {
    backgroundColor: Colors.light.red,
    icon: '✕',
  },
  info: {
    backgroundColor: Colors.dark.background,
    textColor: Colors.light.text,
    icon: 'ℹ',
  },
  warning: {
    backgroundColor: '#F39C12',
    icon: '⚠',
  },
};

const CustomToast = ({ text1, text2, type }: CustomToastProps & { type: ToastType }) => {
  const { backgroundColor, textColor = Colors.dark.text, icon } = toastStyles[type];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.iconContainer}>
        <BodyText color={textColor} style={styles.icon}>{icon}</BodyText>
      </View>
      <View style={styles.textContainer}>
        <BodyText color={textColor} style={styles.text1}>{text1}</BodyText>
        {text2 ? <BodyText color={textColor} style={styles.text2}>{text2}</BodyText> : null}
      </View>
    </View>
  );
};

export const toastConfig = {
  success: (props: CustomToastProps) => <CustomToast {...props} type="success" />,
  error: (props: CustomToastProps) => <CustomToast {...props} type="error" />,
  info: (props: CustomToastProps) => <CustomToast {...props} type="info" />,
  warning: (props: CustomToastProps) => <CustomToast {...props} type="warning" />,
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderColor: Colors.light.text,
    borderWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  text2: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.9,
  },
});
