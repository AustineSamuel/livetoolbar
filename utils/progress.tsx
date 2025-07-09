import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { width } from './properties';
import colors from '@/constants/Colors';

// Define the component to accept progressValue as a prop
interface ProgressBarProps {
  progressValue: number; // Progress value passed from parent
  background?:string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressValue,background }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Update animation when the progressValue changes
    Animated.timing(progress, {
      toValue: progressValue,
      duration: 500,
      useNativeDriver: false, // UseNativeDriver cannot animate width, so false is required
    }).start();
  }, [progressValue]);

  return (
    <View style={[styles.container,{
        backgroundColor:"#d1dae1",
        overflow:"hidden"
    }]}>
      <Animated.View
        style={[
          styles.progressBar,
          
          { width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'], }),backgroundColor:background||colors?.primaryColor, },
        ]}
      />
      {/* <Text style={styles.text}>{progressValue}%</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width-50,
    paddingVertical:0,
    paddingHorizontal:5,
    borderRadius:30
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    // marginLeft:-5
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ProgressBar;
