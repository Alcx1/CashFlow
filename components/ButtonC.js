import React from 'react'
import { View , Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image} from 'react-native'



export default function ButtonC({title,...rest}){
  return(
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:'#FF9A00',
    width:'100%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20
  },
  text:{
    color:'#2E2A2A'
    
  },



})
