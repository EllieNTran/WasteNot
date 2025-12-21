import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, TextInputProps } from 'react-native';
import { BodyText } from './typography';
import { Colors } from '@/src/constants/theme';
import { Icon } from './icon';
import EyeIcon from '@/src/assets/icons/eye.png';
import EyeOffIcon from '@/src/assets/icons/eyeOff.png';

interface TextFieldProps extends TextInputProps {
  label: string;
  isMasked?: boolean;
  error?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  isMasked = false,
  error,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <BodyText color={Colors.light.darkGrey} style={styles.label}>
        {label}
      </BodyText>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          secureTextEntry={isMasked && !isPasswordVisible}
          placeholderTextColor={Colors.light.grey}
          {...props}
        />
        {isMasked && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeButton}
          >
            <Icon source={isPasswordVisible ? EyeIcon : EyeOffIcon} size={18} />
          </Pressable>
        )}
      </View>
      {error && (
        <BodyText color={Colors.light.secondaryGreen} style={styles.errorText}>
          {error}
        </BodyText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 5,
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.text,
    borderRadius: 10,
    backgroundColor: Colors.dark.text,
  },
  inputError: {
    borderColor: Colors.light.secondaryGreen,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.light.text,
  },
  eyeButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});
