import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, TextInputProps } from '@react-native-material/core';
import { colors, typography, spacing } from '@/constants/Theme';

interface CustomTextInputProps extends Omit<TextInputProps, 'style' | 'helperTextStyle' | 'inputContainerStyle'> {
  error?: string;
  onChangeText: (text: string) => void;
}

export default function CustomTextInput({
  error,
  helperText,
  onChangeText,
  ...props
}: CustomTextInputProps) {
  return (
    <TextInput
      variant="outlined"
      color={colors.primary}
      helperText={error || helperText}
      error={!!error}
      style={[styles.input, { paddingLeft: 0 }]}
      inputContainerStyle={{ paddingLeft: 0 }}
      helperTextStyle={styles.helperText}
      onChangeText={onChangeText}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: spacing.md,
    fontSize: typography.sizes.base,
    color: colors.dark,
    width: '100%',
  },
  helperText: {
    color: colors.danger,
    fontSize: typography.sizes.sm,
    marginTop: 4,
    marginBottom: 0,
    marginLeft: 0,
  },
});