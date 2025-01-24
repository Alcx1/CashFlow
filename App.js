import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { AppRegistry, View, Animated } from 'react-native';
import firebaseConfig from './Services/firebase';
import { name as appName } from './app.json';




// Importação dos componentes
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Transfers from './components/transfers';
import AddTransaction from './components/addTransaction';
import Reports from './components/reports';
import Goals from './components/goals';

// Inicialização do Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Registro do aplicativo
AppRegistry.registerComponent(appName, () => App);

// Navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Função de Navegação Principal da Tab Bar
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? '#2E8B57' : '#fff';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Transfers') {
            iconName = 'repeat';
          } else if (route.name === 'AddTransaction') {
            iconName = 'plus-square';
            iconColor = '#fff';
          } else if (route.name === 'Reports') {
            iconName = 'bar-chart-2';
          } else if (route.name === 'Goals') {
            iconName = 'target';
          }

          return (
            <View
              style={
                route.name === 'AddTransaction'
                  ? {
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#2E8B57',
                      borderRadius: 40,
                      width: 50,
                      height:35,
                      padding: 4,
                    }
                  : {}
              }
            >
              <Feather name={iconName} size={22} color={iconColor} />
            </View>
          );
        },
        tabBarActiveTintColor: '#1C1C1C',
        tabBarInactiveTintColor: '#2E8B57',
        tabBarStyle: {
          backgroundColor: '#1C1C1C',
          borderTopWidth: 0,
          elevation: 10,
          height: 50,
          position: 'absolute',
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Transfers" component={Transfers} options={{ headerShown: false }} />
      <Tab.Screen name="AddTransaction" component={AddTransaction} options={{ headerShown: false }} />
      <Tab.Screen name="Reports" component={Reports} options={{ headerShown: false }} />
      <Tab.Screen name="Goals" component={Goals} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

// Função de Navegação Principal do Stack
function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#2E2A2A' },
        headerTintColor: '#FFA500',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={MainTabNavigator} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

// Componente Principal
export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
