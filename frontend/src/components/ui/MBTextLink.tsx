import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../../theme/colors';

interface MBTextLinkProps {
  text: string;
  href?: any;
  onPress?: () => void;
  color?: string;
  style?: any;
  position?: 'start' | 'middle' | 'end';
  containerStyle?: any;
}

export const MBTextLink: React.FC<MBTextLinkProps> = ({
  text,
  href,
  color = colors.primary,
  style,
  position = 'end',
  containerStyle = { marginVertical: 5 },
}) => {
  // Text alignment
  const positionStyles = {
    start: { alignItems: 'flex-start' },
    middle: { alignItems: 'center' },
    end: { alignItems: 'flex-end' },
  };

  const textElem = <Text style={[styles.text, { color }, style]}>{text}</Text>;

  // If href is provided, render as Link
  if (href) {
    return (
      <View style={[styles.wrapper, positionStyles[position], containerStyle]}>
        <Link href={href} asChild>
          <Pressable>{textElem}</Pressable>
        </Link>
      </View>
    );
  }

  //  render plain text
  return <View style={[styles.wrapper, positionStyles[position], containerStyle]}>{textElem}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
