import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ButtonItem } from '../../../../utils/verticalButtons';
import colors from '@/constants/Colors';
import globStyle, { screenPadding } from '@/glob/style';
import NotEligibleMessage from './NotEligibleMessage';

const Jobs:React.FC = () => {
const [notEligible,setNotEligible]=useState<boolean>(true);
  return (
    <View style={{backgroundColor:colors?.white,borderRadius:15,padding:10}}>
      <View style={[globStyle.flexItem,globStyle.alignCenter,{justifyContent:'space-between'}]}>
        <Text style={{fontWeight:"bold",color:colors?.black,fontSize:20}}>Jobs</Text>
      <TouchableOpacity style={styles.hireButton}>
        <Text style={styles.hireButtonText}>Hire a worker</Text>
      </TouchableOpacity>
      </View>
      {notEligible && <NotEligibleMessage/>}
      <View>

      </View>
    </View>
  )
}

const styles=StyleSheet.create({
    hireButton:{
backgroundColor:colors?.primaryColorDarker,
alignSelf:"flex-start",
borderRadius:20,
padding:10
    },
    hireButtonText:{
        color:colors?.white
    }
})
export default Jobs