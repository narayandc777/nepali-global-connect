import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface MBDividerProps {
  text?: string;
  color?: any;
}

export const MBDivider: React.FC<MBDividerProps> = ({ text, color }) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.line]} />
      {text ? <Text style={[styles.text, color ? { color } : {}]}>{text}</Text> : null}
      <View style={[styles.line]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  text: {
    marginHorizontal: 16,
    color: colors.textGray,
    fontSize: 14,
    fontWeight: '500',
  },
});
