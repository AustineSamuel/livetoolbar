import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Header from '@/utils/Header';
import { MonnifyReservedAccount } from '@/app_modules/types/monify.types';
import colors from '@/constants/Colors';
import globStyle from '@/glob/style';
import BR from '@/utils/BR';
import * as LINKING from 'expo-linking';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useDispatch } from 'react-redux';
import { showNotification } from '@/store/notificationSlice';

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
  const dispatch = useDispatch();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copy = async (text: string, index: number) => {
    try {
      await Clipboard.setStringAsync(text);
      setCopiedIndex(index);

      dispatch(showNotification({ message: 'Copied!', type: 'success' }));

      setTimeout(() => setCopiedIndex(null), 3000);
    } catch (error) {
      dispatch(
        showNotification({ message: 'Failed to copy. Try again.', type: 'error' })
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Fund Wallet" />
      <View style={styles.container}>
        <Text style={styles.title}>
          To fund your wallet, transfer to any of the following accounts:
        </Text>

        {mockData.accounts.map((account, index) => (
          <View key={index} style={styles.accountCard}>
            <Text style={styles.bankName}>{account.bankName}</Text>
            <View
              style={[
                globStyle.flexItem,
                globStyle.alignCenter,
                globStyle.flexBetween,
              ]}
            >
              <Text style={styles.accountNumber}>{account.accountNumber}</Text>
              <TouchableOpacity
                style={styles.copyBtn}
                onPress={() => copy(account.accountNumber, index)}
              >
                {copiedIndex === index ? (
                  <FontAwesome5 name="check-double" size={18} color={colors.primaryColor} />
                ) : (
                  <Feather size={18} name="copy" color="#444" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.accountName}>{mockData.accountName}</Text>
          </View>
        ))}

        <Text style={styles.note}>
          ⚠️ Funds sent to these accounts will reflect in your wallet automatically.
        </Text>

        <BR height={5} />

        <TouchableHighlight
          onPress={() => {
            LINKING.openURL('https://lifetoolbar.com/terms');
          }}
          underlayColor={colors.lightGray}
        >
          <Text style={globStyle.link}>Read terms and conditions</Text>
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
    copyBtn: {
    backgroundColor: '#f6efef',
    borderRadius: 4,
    padding: 8,
    marginLeft: 10,
  },

});
