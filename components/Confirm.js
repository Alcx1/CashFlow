import React, { Component, useEffect, useState, useRef } from 'react';
import { View , Text, StyleSheet, FlatList, Button, TouchableOpacity, SafeAreaView, Image, Animated} from 'react-native';
import {ScrollView, TextInput, Input} from 'react-native-gesture-handler'
import { useNavigation} from '@react-navigation/native'
import ButtonC from './ButtonC'
import check from '../assets/confirm.png'

    
    
export default function Confirmacao(){
  const navigation = useNavigation()

  const goToDashboard = () =>{
    navigation.navigate('Maps')

    }
  return(
  <View style={styles.container}>
    <Image style={styles.image}
          source={check}/>
      <Text style={styles.primario}>Agendamento realizado com sucesso!!</Text>
      <Text style={styles.secundario}>Clicando abaixo você tem nossa localização.</Text>
    <ButtonC title="Nossa localização" onPress={goToDashboard}/>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2E2A2A'
  },
  image:{
    width:150,
    height:200,
    resizeMode:'contain'

  },
  primario:{
    textAlign:'center',
    fontSize:30,
    color:'#fff'
  },
  secundario:{
    textAlign:'center',
    color:'#fff'
  }







})