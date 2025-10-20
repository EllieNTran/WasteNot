import { Text, StyleSheet, TextProps } from 'react-native';

interface BodyTextProps extends TextProps {
  color?: string;
}

export function Title(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: 'DMSerifDisplay', fontSize: 32, fontWeight: 'bold' }, props.style]}
    />
  );
}

export function BodyText({ color = '#fff', style, ...props }: BodyTextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'Nunito', fontSize: 16, color },
        style,
      ]}
    />
  );
}


