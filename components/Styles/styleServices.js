import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container:{
    marginTop:20,
    backgroundColor: '#FF9A00',
    height:250,
    width:200,
    elevation:2,
    borderRadius:10,
    padding:15,
    marginRight:30,
    marginLeft:2,
    marginBottom:5,
  },
  cover:{
    width:'100%',
    height:130,
    borderRadius:15,
  },
  content:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:10,
  },
  title:{
    fontFamily:'Bold',
    fontSize:18,
    color:'black',
  },
  badge:{
    color:'#FF9A00',
    fontSize:11,
    marginLeft:10,
    fontFamily:'Montserrat_700Bold',
    backgroundColor:'#FF9A00'
  },
  description:{
    fontFamily:'Montserrat_400Regular',
    fontSize: 12,
    color:'#4f4a4a'
  },
});
export default stylesDashboard;
