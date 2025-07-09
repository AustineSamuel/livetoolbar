import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

interface Props {
  label?: string;
  style?: ViewStyle | any;
  textStyle?: TextStyle | any;
  children?: React.ReactNode;
  onPress?: () => void;
}

const MyButton: React.FC<Props> = ({ label, onPress, style = {}, textStyle = {}, children }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {!children ? (
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Default button color
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyButton;
