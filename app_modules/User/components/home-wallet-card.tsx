import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // for eye icon
import globStyle from '@/glob/style';
import { formatToNaira } from '@/Logics/date';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/Colors';

const HomeWalletCard: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);

  const balance = 3200.50; // Example balance

  return (
    <LinearGradient
        colors={['rgba(0,0,0,0.8)', colors.primaryColor]}
        
         start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.5 }}
      
      style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Wallet Balance</Text>
        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
          <Ionicons 
            name={showBalance ? 'eye-off' : 'eye'} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>

<View style={[globStyle.flexItem,globStyle.flexBetween,{height:60,alignItems:"flex-end"}]}>
      <Text style={styles.balance}>
        {showBalance ? `${formatToNaira(balance,true)}` : '****'}
      </Text>

      <TouchableOpacity style={styles.fundButton}>
        <Text style={styles.fundText}>Fund Wallet</Text>
      </TouchableOpacity>
</View>
      
    </LinearGradient>
  );
};

export default HomeWalletCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  balance: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  fundButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
  fundText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    color: '#fff',
    letterSpacing: 2,
  },
  validThru: {
    color: '#fff',
  },
  masterLabel: {
    color: '#fff',
    textAlign: 'right',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.7,
  },
});
