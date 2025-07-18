import { transactions } from '@/app_modules/types/transaction.types';
import colors from '@/constants/Colors';
import globStyle from '@/glob/style';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  item: transactions;
}

const TransactionItem: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.ref}>{item.ref}</Text>
        <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
    <View style={[globStyle.flexItem,globStyle.alignCenter,globStyle.flexBetween]}>
      <Text style={styles.amount}>
        {item.transactionAmount > 0 ? '+' : ''}{item.transactionAmount} USD
      </Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  ref: {
    fontWeight: 'bold',
  },
  message: {
    marginTop: 4,
    fontSize: 14,
  },
  amount: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  status: {
    textTransform: 'capitalize',
    fontSize:12,
    borderRadius:10,
    backgroundColor:colors?.white,
    paddingHorizontal:10
  },
});

const getStatusStyle = (status: transactions['status']) => {
  switch (status) {
    case 'success': return { color: 'green' };
    case 'pending': return { color: 'orange' };
    case 'failed': return { color: 'red' };
    case 'expired': return { color: 'gray' };
    default: return {};
  }
};
