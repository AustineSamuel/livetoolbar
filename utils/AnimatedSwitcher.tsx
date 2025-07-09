// components/AnimatedSwitcher.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    SlideInLeft,
    SlideInRight,
    SlideOutLeft,
    SlideOutRight,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  direction: 'left' | 'right';
  keyId: string;
}

const AnimatedSwitcher: React.FC<Props> = ({ children, direction, keyId }) => {
  return (
    <Animated.View
      key={keyId}
      entering={direction === 'left' ? SlideInLeft.duration(300) : SlideInRight.duration(300)}
      exiting={direction === 'left' ? SlideOutLeft.duration(300) : SlideOutRight.duration(300)}
      style={styles.container}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});

export default AnimatedSwitcher;
