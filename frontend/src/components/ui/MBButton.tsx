import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { colors, theme } from '../../theme/colors';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg';

interface MBButtonProps {
  children: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: string;
  rightIcon?: string;
  style?: any;
  contentStyle?: any;
  labelStyle?: any;
  buttonColor?: string;
  textColor?: string;
}

export const MBButton: React.FC<MBButtonProps> = ({
  children,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  icon,
  rightIcon,
  style,
  contentStyle,
  labelStyle,
  buttonColor,
  textColor,
}) => {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <Button
      mode={v.mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      icon={icon}
      style={[
        styles.button,
        s.button,
        fullWidth
          ? { alignSelf: 'stretch', width: '100%' }
          : { alignSelf: 'flex-start', width: 'auto' },
        style,
      ]}
      contentStyle={[s.content, contentStyle]}
      labelStyle={[styles.label, s.label, v.label, labelStyle]}
      buttonColor={buttonColor ?? v.buttonColor}
      textColor={textColor ?? v.textColor}
    >
      {children}
    </Button>
  );
};

const variantStyles: Record<
  Variant,
  {
    mode: 'text' | 'outlined' | 'contained' | 'contained-tonal';
    buttonColor?: string;
    textColor?: string;
    label?: TextStyle;
  }
> = {
  primary: {
    mode: 'contained',
    buttonColor: colors.primary,
    textColor: colors.textWhite,
    label: { fontWeight: '600' },
  },
  secondary: {
    mode: 'contained-tonal',
    buttonColor: theme.colors.secondary,
    textColor: colors.textWhite,
    label: { fontWeight: '600' },
  },
  outline: {
    mode: 'outlined',
    textColor: colors.primary,
    label: { fontWeight: '600' },
  },
  ghost: {
    mode: 'text',
    textColor: colors.primary,
  },
  danger: {
    mode: 'contained',
    buttonColor: colors.error,
    textColor: colors.textWhite,
    label: { fontWeight: '600' },
  },
  success: {
    mode: 'contained',
    buttonColor: colors.success,
    textColor: colors.textWhite,
    label: { fontWeight: '600' },
  },
};

const sizeStyles: Record<
  Size,
  {
    button: ViewStyle;
    content: ViewStyle;
    label: TextStyle;
  }
> = {
  sm: {
    button: { borderRadius: 6 },
    content: { height: 40 },
    label: { fontSize: 14 },
  },
  md: {
    button: { borderRadius: 8 },
    content: { height: 48 },
    label: { fontSize: 16 },
  },
  lg: {
    button: { borderRadius: 10 },
    content: { height: 56 },
    label: { fontSize: 18 },
  },
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
  },
  label: {
    textAlign: 'center',
  },
});
