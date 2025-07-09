import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  DimensionValue,
} from 'react-native';

type SkeletonType = 'rect' | 'circle' | 'text';

interface AnimatedSkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  type?: SkeletonType;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const Skeleton: React.FC<AnimatedSkeletonProps> = ({
  width = 100,
  height = 20,
  type = 'rect',
  borderRadius,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate();
  }, [opacity]);

  const shapeStyle: ViewStyle = {
    width,
    height,
    borderRadius:
      type === 'circle' && typeof width === 'number'
        ? width / 2
        : borderRadius ?? (type === 'text' ? 4 : 8),
  };

  return (
    <Animated.View
      style={[
        styles.base,
        shapeStyle,
        { opacity },
        style,
      ]}
    />
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',
  },
});
