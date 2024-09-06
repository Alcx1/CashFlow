import React, {useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


export default function Comentarios({ cover }) {
  const[comentario, setComent] = useState('Carregando comentario...')
  
  useEffect(()=>{
    async function dados(){
      await firebase.database().ref('nome').on('value', (snapshot)=>{
      setComent(snapshot.val());
      });
    }
    dados();
  },[]);
 
 
 
 
 return (
   <View style={styles.container}>
      <View>
        <Image
          source={cover}
          style={styles.cover}
          />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          {comentario}
        </Text>
      
      </View>
   </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flexDirection:'row',
    width:'100%',
    height:50,
    backgroundColor:'#FF9A00',
    elevation:2,
    padding:6,
    marginVertical:5,
    marginRight:20,
    marginLeft:2,
    borderRadius:15,
  },
  cover:{
    flexDirection:'row',
    borderRadius:15,
    width:18,
    marginTop:2,
    height:20
  },
  content:{
    width:'65%',
    justifyContent:'flex-end',
    paddingHorizontal:10,
    flexDirection:'row',
    height:'100%'
  },
  description:{
    fontSize:12,
    color:'#2E2A2A',
    marginRight:122,
    marginTop:4,
    fontFamily:'bold'
  }
});