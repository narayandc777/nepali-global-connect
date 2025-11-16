import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { colors } from '../../theme/colors';

interface MBNotificationBarProps {
  visible?: boolean;
  message: string;
  type?: 'error' | 'success' | 'info';
  duration?: number;
  onDismiss?: () => void;
}

export const MBNotificationBar: React.FC<MBNotificationBarProps> = ({
  visible = false,
  message,
  type = 'error',
  duration = 3000,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'info':
        return colors.info;
      case 'error':
      default:
        return colors.error;
    }
  };

  return (
    <Snackbar
      visible={isVisible}
      onDismiss={() => {
        setIsVisible(false);
        onDismiss && onDismiss();
      }}
      duration={duration}
      style={[styles.snackbar, { backgroundColor: getBackgroundColor() }]}
    >
      {message}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    margin: 8,
    borderRadius: 8,
  },
});
