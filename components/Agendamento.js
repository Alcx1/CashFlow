import React, { Component, useEffect, useState, useRef } from 'react';
import { View , Text, StyleSheet, FlatList, Button, TouchableOpacity, SafeAreaView, Image, Animated} from 'react-native';
import {ScrollView, TextInput, Input} from 'react-native-gesture-handler'
import { useNavigation} from '@react-navigation/native'
import user from '../assets/profile-user.png'
import {horario} from './Horarios'
import ButtonC from './ButtonC'
import DateTimePickerModal from "react-native-modal-datetime-picker";




export default function Agendamento(){
  const navigation = useNavigation()

  const goToConfirm = () =>{
    navigation.navigate('Confirm')

    }
  

  const [isSelected, setSelected] = useState();
  const [inicio, setInicio] = useState('')
  const [date,setDate] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  




  const fadeAnim = useRef (new Animated.Value(0)).current;
  const position = new Animated.ValueXY({x:0, y:0});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };
  const fadeIn = () =>{
    Animated.timing(fadeAnim, {
      toValue:1,
      duration:200,
      useNativeDriver:true,
    }).start();
  };

  const slide = () => {
    Animated.timing(position, {
      toValue:{ x:0, y:-100 },
      speed:500,
      useNativeDriver:true,
    }).start();
  };
  
  
  useEffect(() => {
    if(isSelected && date) {
      fadeIn(), slide();
    }
  });




  const addTime = (value,inicio)=>{
     setSelected(value)
     setInicio(inicio); 
  }



  return(
    <View style={styles.container}>
      <View>
        <View style={styles.productContainer}>
          <View style={styles.imgusuario}>
          </View>
          <View>
            <Text style={styles.productText}>O melhor serviço para você</Text>
          </View>
        </View>
      </View>
      <Text style={styles.titleCategory}>
        Agende seu serviço
      </Text>

      <View>
        <TouchableOpacity style={styles.buttonCalendar} onPress={showDatePicker}>
            <Text style={styles.textDate}>{date == '' ? "Escolha uma data" : date.toString().substring(0,15)}</Text>
            <Text style={styles.textDate}>{inicio}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm} 
        onCancel={hideDatePicker}
        />


      </View>


        <Text style={styles.titleCategory}>Horários</Text>
        <FlatList
          showVerticalScrollIndicator={false}
          style={styles.FlatList}
          keyExtractor={(item)=>item.id.toString()}
          data={horario}
          renderItem={({item})=>(
            <TouchableOpacity style={styles.timeContainer} onPress={()=> addTime(item.id, item.inicio)}>
              <Text style={item.id == isSelected ?  styles.selected : styles.textTime}>
                  {item.inicio} - {item.final}
              </Text>
              <View>
                <Text style={styles.textTime}>Livre</Text>
              </View>
            </TouchableOpacity>
          )}
        />






      <Animated.View
      style={{
        height:80,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        position:'absolute',
        bottom:-80,
        alignSelf:'center',
        opacity:fadeAnim,
        transform:[{translateX: position.x},{translateY: position.y}],
        }}
        >
        <ButtonC title="Agendar" onPress={goToConfirm}/>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:30,
    backgroundColor:'#2E2A2A',
    flex:1
    
  },
  imgusuario:{
    height:5,
    width:5,
    marginLeft:10
  },
  productContainer:{ 
    flexDirection:'row',
    height:40,
    alignItems:'center',
    borderColor:'#FF9A00',
    borderBottomWidth:1,
    marginBottom:20
  },
  productText:{
    fontWeight:'bold',
    fontSize:18,
    color:'#FF9A00',


  },
  titleCategory:{
    fontWeight:'bold',
    fontSize:20,
    color:'#FF9A00',
    marginBottom:20
  },
  buttonCalendar:{
    height:55,
    borderBottomWidth:3,
    borderColor:'#2E2A2A',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:10,
    borderRadius:20,
    backgroundColor:'#FF9A00'

  },
  textDate:{
    color:'#2E2A2A',
    fontWeight:'bold',
    fontSize:14
  },
  timeContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:40,
    borderColor:'#2E2A2A',
    borderBottomWidth:1,
    paddingBottom:1,
    backgroundColor:'#FF9A00',
    paddingHorizontal:20,
    borderRadius:30,
  },
  textTime:{
    color:'#2E2A2A'
  },
  selected:{
    color:'red',
  },
  

  



})