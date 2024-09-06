import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Cadastro from './components/cadastro';
import Dashboard from './components/dashboard';
import Alinhamento from './components/Alinhamento';
import Agendamento from './components/Agendamento';
import Agendamento2 from './components/Agendamento2';
import Confirm from './components/Confirm';
import Manutencao from './components/Manutencao';
import Revisao from './components/Revisao';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { AppRegistry } from 'react-native'; // Certifique-se de que essa linha está presente
import firebaseConfig from './database/firebase';
import { name as appName } from './app.json';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

AppRegistry.registerComponent(appName, () => App);




const Stack = createStackNavigator();

function Home() {
  return (
    <Stack.Navigator
      initialRouteName=""
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E2A2A',
        },
        headerTintColor: '#FFA500',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Login" 
      component={Dashboard} 
      options={{headerShown:false}} 
      />
      
      <Stack.Screen 
      name="Confirm" 
      component={Confirm} />
      
      <Stack.Screen 
      name="Alinhamento" 
      component={Alinhamento} />

      <Stack.Screen
        name="Agendamento"
        component={Agendamento}
        options={{ headerLeft: null }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{headerShown:false}} 
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ title: '' }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Revisao"
        component={Revisao}
        options={({ title: 'Inicio' }, { headerLeft: null })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );

}