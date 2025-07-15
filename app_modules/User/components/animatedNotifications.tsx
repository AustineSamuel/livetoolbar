import React, { useEffect } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hideNotification } from '@/store/notificationSlice';

const { width } = Dimensions.get('window');

export default function AnimatedNotification() {
  const dispatch = useDispatch();
  const { visible, message, type } = useSelector((state:any) => state.notification);

  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(-150);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished) {
          translateY.value = withDelay(
            3000,
            withTiming(-150, { duration: 500 }, (done) => {
              if (done) {
                runOnJS(() => dispatch(hideNotification()))();
              }
            })
          );
        }
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backgroundColor = {
    info: '#3498db',
    success: '#2ecc71',
    error: '#e74c3c',
  }[type as "info"];

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor, top: insets.top + 10 }, // ← Here we set below status bar
        animatedStyle,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width - 20,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 8,
    zIndex: 1000,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
