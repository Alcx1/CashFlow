import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; // Ícones
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { AppRegistry } from 'react-native';
import { View, Animated } from 'react-native'; // Biblioteca de animações
import firebaseConfig from './database/firebase';
import { name as appName } from './app.json';

// Importando as telas do aplicativo
import Login from './components/login';
import Cadastro from './components/cadastro';
import Dashboard from './components/dashboard';
import Alinhamento from './components/Alinhamento';
import Agendamento from './components/Agendamento';
import Agendamento2 from './components/Agendamento2';
import Confirm from './components/Confirm';
import Manutencao from './components/Manutencao';
import Revisao from './components/Revisao';
import SettingsScreen from './components/SettingsScreen';
import FavoritesScreen from './components/FavoritesScreen';

// Inicializando o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Registrando o componente principal
AppRegistry.registerComponent(appName, () => App);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Cria um Tab Navigator

// Cria o Tab Navigator para as três telas principais
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? '#fff' : '#0A3D52'; // Ícone branco quando focado e #0A3D52 quando inativo

          // Define o ícone para cada aba
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          }

          // Animação de escala ao selecionar a aba
          const scale = focused ? new Animated.Value(1.1) : new Animated.Value(1);
          Animated.spring(scale, {
            toValue: focused ? 1.1 : 1,
            friction: 3,
            useNativeDriver: true,
          }).start();

          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focused ? '#0A3D52' : 'transparent', // Destaque quando focado
                borderRadius: 50, // Borda arredondada
                padding: 10, // Espaço ao redor do ícone para o destaque
              }}
            >
              <Animated.View style={{ transform: [{ scale }]}}>
                <Feather name={iconName} size={28} color={iconColor} /> 
              </Animated.View>
            </View>
          );
        },
        tabBarActiveTintColor: '#fff', // Cor ativa branca
        tabBarInactiveTintColor: '#0A3D52',  // Cor inativa
        tabBarStyle: {
          backgroundColor: '#fff', // Cor de fundo da tabBar
          borderTopWidth: 0,
          elevation: 10,
          height: 80, // Altura da tabBar ajustada para centralizar os ícones
          paddingBottom: 0, // Remove o padding inferior para centralizar os ícones
          paddingTop: 0, // Remove o padding superior para dar mais espaço
          marginHorizontal: 0, // Remove as margens laterais
          marginBottom: 0, // Remove a margem inferior
          position: 'absolute', // Fixa a tabBar no fundo
        },
        tabBarShowLabel: false, // Remove os nomes dos ícones
      })}
    >
      
      
      <Tab.Screen
        name="Settings"
        component={SettingsScreen} // Componente Configurações
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={Dashboard} // Componente Home
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen} // Componente Favoritos
        options={{ headerShown: false }}
      />
      
    </Tab.Navigator>
  );
}

// Função principal de navegação Stack + Tab
function Home() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E2A2A',
        },
        headerTintColor: '#FFA500',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login} // Corrigido para exibir a tela de Login primeiro
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={MainTabNavigator} // Navega para o Tab Navigator ao fazer login
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
      />
      <Stack.Screen
        name="Alinhamento"
        component={Alinhamento}
      />
      <Stack.Screen
        name="Agendamento"
        component={Agendamento}
        options={{ headerLeft: null }}
      />
      <Stack.Screen
        name="Revisao"
        component={Revisao}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
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
