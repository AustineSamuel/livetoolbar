import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
};

const AddRemoveNumberOfName = ({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
}: Props) => {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={decrease} style={styles.circle}>
          <Text style={styles.symbol}>−</Text>
        </TouchableOpacity>

        <Text style={styles.value}>{value}</Text>

        <TouchableOpacity onPress={increase} style={styles.circle}>
          <Text style={styles.symbol}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRemoveNumberOfName;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width:"100%",
    display:"flex",
    gap:10,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    fontSize: 22,
    fontWeight:"800",
    color: '#333',
  },
  value: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '500',
    width: 24,
    textAlign: 'center',
  },
});
