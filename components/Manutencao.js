import React, { Component, useEffect, useState } from 'react';
import { View , Text, StyleSheet, FlatList, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import {ScrollView, TextInput, Input} from 'react-native-gesture-handler'
import { useNavigation} from '@react-navigation/native'



export default class Manutencao extends Component {
  
  
  constructor() {
    

    super();
      

    this.state = {
      
    }
    
    ;
  }
  
  
  render() {
    return (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.text}>
        TIPOS DE MANUTENÇÕES
      </Text>
    </View>
    
    <View style={styles.container}>
      <View>
      <Text style={styles.tipos}>Higienização</Text>
      </View>
      <Text style={styles.preco}>R$ 50,00</Text>
            
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('Agendamento')}>
        <Text>Agendar</Text>
      </TouchableOpacity>

      <View>
      <Text style={styles.tipos}>Recarga do gás do ar</Text>
      </View>
      <Text style={styles.preco}>R$ 100,00</Text>
            
      <TouchableOpacity
        style={styles.button2}> 
        <Text>Agendar</Text>
      </TouchableOpacity>
    </View>
  
  </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex:1,
  backgroundColor: '#2E2a2a',
  flexDirection:'column',
  },
  text:{
    padding:4,
    justifyContent:'center',
    color:'#FF9A00',
    marginLeft:50,
    marginTop:20,
    fontSize:25,
    fontFamily:'bold'
  },
  tipos:{
    justifyContent:'center',
    color:'#FF9A00',
    marginLeft:50,
    marginTop:20,
    fontSize:22,
  },
  preco:{
    marginLeft:50,
    color:'#FF9A00',
    fontSize:18,
    marginTop:5
  },
  button:{
    backgroundColor: "#FF9A00",
    padding:8,
    borderRadius:10,
    width:80,
    position:'absolute',
    left:280,
    marginTop:38
  },
  button2:{
    backgroundColor: "#FF9A00",
    padding:8,
    borderRadius:10,
    width:80,
    position:'absolute',
    left:280,
    marginTop:115
  }
})