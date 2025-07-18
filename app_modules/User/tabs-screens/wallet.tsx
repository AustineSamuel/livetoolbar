import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import BR from '@/utils/BR';
import globStyle from '@/glob/style';
import fakeTransactions from '../static-data/transactions.data';
import TransactionItem from '../components/Wallet/transactionCard';
import { generateUniqueString } from '@/Logics/date';
import useUser from '@/hooks/useUser';
import { formatToNaira } from '../../../Logics/date';
import colors from '@/constants/Colors';
import { router } from 'expo-router';


const Wallet: React.FC = () => {
  const user=useUser();
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader />
      <View style={{ padding: 16 }}>
        <View style={[globStyle.flexItem,globStyle.alignCenter,globStyle.flexBetween,{
          paddingVertical:20
        }]}>
          <Text style={[style.title,{
            fontSize:23
          }]}>{formatToNaira(user?.balance||0,true)}</Text>
        
        
              <TouchableOpacity onPress={()=>{
                router.push("/screens/fundwallet")
              }} style={style.fundButton}>
                <Text style={style.fundText}>Fund Wallet</Text>
              </TouchableOpacity>
        
        </View>
        
        
        <BR height={16} />
    
      </View>
          <View style={style.container}>
          <Text style={style.title}>Transactions</Text>
          <BR height={2} />
          <FlatList
            data={[...fakeTransactions,...fakeTransactions,...fakeTransactions]}
            keyExtractor={(item) => generateUniqueString(40)}
            renderItem={({ item }) => <TransactionItem item={item} />}
            showsVerticalScrollIndicator={false}
            style={{height:390}}
          />
        </View>

    </View>
  );
};

export default Wallet;

const style = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  
  },
  container: {
    backgroundColor: 'white',
    // minHeight: height - height / 3 - 30,
    flex:1,
    // borderRadius: 10,
    padding: 10,
  },
    fundButton: {
    backgroundColor:colors?.primaryColorDarker,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
    fundText: {
    color: '#f5f0f0',
    fontWeight: 'bold',
  }
});
