import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import VerticalButtons from './verticalButtons';

type Props = {
  scrollY: number;
  items: any[];
};

const AnimatedVerticalButtons = ({ scrollY, items }: Props) => {
  const [visible, setVisible] = useState(scrollY > 100);
  const translateX = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (scrollY > 100) {
      setVisible(true); // make it visible immediately
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false); // hide after animation completes
      });
    }
  }, [scrollY]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="auto"
      style={[
        styles.container,
        {
          // transform: [{ translateY: translateX}],
          opacity,
        },
      ]}
    >
      <VerticalButtons items={items} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
 
    width: '100%',
  },
});

export default AnimatedVerticalButtons;
