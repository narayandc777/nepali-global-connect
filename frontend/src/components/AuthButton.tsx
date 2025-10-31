import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface AuthButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: string;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  loading = false,
  disabled = false,
  children,
  mode = 'contained',
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      style={styles.button}
      contentStyle={styles.buttonContent}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
