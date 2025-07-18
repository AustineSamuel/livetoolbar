import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Header from '@/utils/Header';
import { MonnifyReservedAccount } from '@/app_modules/types/monify.types';
import colors from '@/constants/Colors';
import globStyle from '@/glob/style';
import BR from '@/utils/BR';
import * as LINKING from "expo-linking";
const mockData: MonnifyReservedAccount = {
  accountReference: 'tapnob-08123456789',
  accountName: 'Tapnob Wallet Funding',
  customerEmail: 'user@example.com',
  accounts: [
    {
      bankCode: '057',
      bankName: 'Zenith Bank',
      accountNumber: '1234567890',
    },
    {
      bankCode: '011',
      bankName: 'First Bank',
      accountNumber: '1122334455',
    },
  ],
  contractCode: '1234567890',
  customerName: 'John Doe',
  currencyCode: 'NGN',
  reservationReference: 'ABC123XYZ456',
};

const Fundwallet = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Fund Wallet" />
      <View style={styles.container}>
        <Text style={styles.title}>To fund your wallet, transfer to any of the following accounts:</Text>

        {mockData.accounts.map((account, index) => (
          <View key={index} style={styles.accountCard}>
            <Text style={styles.bankName}>{account.bankName}</Text>
            <Text style={styles.accountNumber}>{account.accountNumber}</Text>
            <Text style={styles.accountName}>{mockData.accountName}</Text>
          </View>
        ))}

        <Text style={styles.note}>
          ⚠️ Funds sent to these accounts will reflect in your wallet automatically.
        </Text>
        <BR height={5}/>
        <TouchableHighlight onPress={()=>{
            LINKING.openURL("https://livetoolbar.com/terms")
        }} underlayColor={colors?.lightGray}>
            <Text style={globStyle.link}>Read terms and consitions</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Fundwallet;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  accountCard: {
    backgroundColor: colors?.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    marginLeft:-6,
    width:"100%"
  },
  bankName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  accountNumber: {
    fontSize: 18,
    marginTop: 4,
    fontWeight: '600',
  },
  accountName: {
    fontSize: 14,
    color: 'gray',
  },
  note: {
    marginTop: 20,
    fontSize: 13,
    color: '#666',
  },
});
