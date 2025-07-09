import React, { memo, useRef } from 'react';
import { View, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globStyle from '@/glob/style';
import colors from '@/constants/Colors';


const AnimatedImage = ({ image, index, onRemove }: { image: string, index: number, onRemove: (index:number) => void }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handleRemove = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      onRemove(index); // Only remove from state after animation completes
    });
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
          position: 'relative',
        },
        styles.carImage
      ]}
    >
      <TouchableOpacity
        onPress={handleRemove}
        style={[
          {
            backgroundColor: colors?.white,
            width: 30,
            height: 30,
            borderRadius: 15,
            position: 'absolute',
            zIndex: 99,
            margin: 2,
          },
          globStyle.flexItem,
          globStyle.flexCenter
        ]}
      >
        <Ionicons name="close-circle" size={25} color="gray" />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.carImage} />
    </Animated.View>
  );
};



const styles=StyleSheet.create({
    imagePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      carImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
      },
      imagePicker: {
        backgroundColor: '#e0e0e0',
        padding: 35,
        borderRadius: 5,
      },
})

export default AnimatedImage