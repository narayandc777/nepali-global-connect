import React from 'react';
import Svg, { Circle, Path, G, Ellipse } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

interface GlobeIconProps {
  size?: number;
  color?: string;
}

export const GlobeIcon: React.FC<GlobeIconProps> = ({ size = 120, color = '#4CAF50' }) => {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <G>
          {/* Main globe circle */}
          <Circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" />

          {/* Horizontal lines (latitude) */}
          <Ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="15"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />
          <Ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="25"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Vertical lines (longitude) */}
          <Ellipse
            cx="50"
            cy="50"
            rx="15"
            ry="45"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />
          <Ellipse
            cx="50"
            cy="50"
            rx="25"
            ry="45"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Center vertical line */}
          <Path d="M 50 5 L 50 95" stroke={color} strokeWidth="1.5" opacity="0.6" />

          {/* Center horizontal line */}
          <Path d="M 5 50 L 95 50" stroke={color} strokeWidth="1.5" opacity="0.6" />

          {/* Decorative continents (simple shapes) */}
          <Path d="M 30 35 Q 35 30 40 35 L 45 40 L 40 45 Z" fill={color} opacity="0.4" />
          <Path d="M 55 25 Q 60 22 65 28 L 68 35 L 60 38 Z" fill={color} opacity="0.4" />
          <Path d="M 25 55 Q 30 52 35 58 L 38 65 L 28 68 Z" fill={color} opacity="0.4" />
          <Path d="M 60 55 Q 65 50 70 55 L 75 62 L 68 68 Z" fill={color} opacity="0.4" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
