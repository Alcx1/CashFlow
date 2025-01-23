import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { AppRegistry, View, Animated } from 'react-native';
import firebaseConfig from './database/firebase';
import { name as appName } from './app.json';

import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import SettingsScreen from './components/SettingsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import ProfileScreen from './components/ProfileScreen';
import CategoryClientsScreen from './components/CategoryClientsScreen';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

AppRegistry.registerComponent(appName, () => App);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? '#fff' : '#0A3D52';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          }

          const scale = focused ? new Animated.Value(1.1) : new Animated.Value(1);
          Animated.spring(scale, {
            toValue: focused ? 1.1 : 1,
            friction: 3,
            useNativeDriver: true,
          }).start();

          return (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: focused ? '#0A3D52' : 'transparent',
              borderRadius: 50,
              padding: 13,
            }}>
              <Animated.View style={{ transform: [{ scale }] }}>
                <Feather name={iconName} size={28} color={iconColor} />
              </Animated.View>
            </View>
          );
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#0A3D52',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
          height: 66,
          paddingBottom: 0,
          paddingTop: 0,
          marginHorizontal: 0,
          marginBottom: 0,
          position: 'absolute',
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator
      initialRouteName="Register" 
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
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={MainTabNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CategoryClientsScreen"
        component={CategoryClientsScreen}
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
