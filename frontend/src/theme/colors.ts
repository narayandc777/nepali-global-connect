export const colors = {
  // Primary - Light Green Shades
  primary: '#4CAF50',
  primaryLight: '#81C784',
  primaryDark: '#388E3C',
  primaryVeryLight: '#E8F5E9',

  // Accent
  accent: '#66BB6A',
  accentLight: '#A5D6A7',

  // Background
  background: '#FFFFFF',
  backgroundLight: '#F1F8E9',
  backgroundGreen: '#C8E6C9',

  // Text
  textPrimary: '#1B5E20',
  textSecondary: '#558B2F',
  textLight: '#7CB342',
  textGray: '#666666',
  textWhite: '#FFFFFF',

  // Status
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',

  // Borders
  border: '#C8E6C9',
  borderDark: '#81C784',

  // Overlay
  overlay: 'rgba(76, 175, 80, 0.1)',
  overlayDark: 'rgba(27, 94, 32, 0.8)',
};

export const theme = {
  colors: {
    primary: colors.primary,
    primaryContainer: colors.primaryVeryLight,
    secondary: colors.accent,
    secondaryContainer: colors.accentLight,
    background: colors.background,
    surface: colors.backgroundLight,
    error: colors.error,
    onPrimary: colors.textWhite,
    onSecondary: colors.textWhite,
    onBackground: colors.textPrimary,
    onSurface: colors.textPrimary,
    outline: colors.border,
  },
};
