import React from 'react';
import { StyleSheet, View, TextInput as RNTextInput, Text } from 'react-native';
import { TextInputProps } from '@react-native-material/core';
import { colors, typography, spacing, globalStyles } from '@/constants/Theme';

interface CustomTextInputProps extends Omit<TextInputProps, 'style' | 'helperTextStyle' | 'inputContainerStyle'> {
  error?: string;
  onChangeText: (text: string) => void;
  trailing?: (props: any) => React.ReactNode;
}

export default function CustomTextInput({
  error,
  helperText,
  onChangeText,
  trailing,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <RNTextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholderTextColor={colors.gray[400]}
          {...props}
        />
        {trailing && (
          <View style={styles.trailingContainer}>
            {trailing(props)}
          </View>
        )}
      </View>
      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    color: colors.text,
    fontSize: typography.sizes.md,
    paddingHorizontal: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  inputError: {
    borderColor: colors.danger,
  },
  trailingContainer: {
    paddingRight: spacing.sm,
  },
  helperText: {
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
    color: colors.gray[600],
  },
  errorText: {
    color: colors.danger,
  },
});