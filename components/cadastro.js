import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform,
  Image
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebaseConfig from '../database/firebase';
import styles from './Styles/styles';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      isLoading: false,
    };
  }

  updateInputVal = (val) => {
    this.setState({ displayName: val });
  };

  registerUser = () => {
    const { displayName } = this.state;

    if (displayName === '') {
      Alert.alert('Erro', 'Por favor, preencha o campo de nome.');
      return;
    }

    this.setState({ isLoading: true });

    // Definir o email e senha com base no nome do usuário
    const email = `${displayName.toLowerCase()}@exemplo.com`;
    const password = `${displayName}123456`; // Senha padrão: nome do usuário + "123456"

    // Registrar ou logar o usuário
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return updateProfile(res.user, { displayName });
      })
      .then(() => {
        Alert.alert('Sucesso', `Bem-vindo, ${displayName}!`);
        this.setState({ isLoading: false, displayName: '' });
        LayoutAnimation.easeInEaseOut();
        this.props.navigation.navigate('Dashboard');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          // Se o email já está em uso, faz login com o email e senha gerados
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              Alert.alert('Bem-vindo de volta!', `${displayName}`);
              this.setState({ isLoading: false, displayName: '' });
              LayoutAnimation.easeInEaseOut();
              this.props.navigation.navigate('Dashboard');
            })
            .catch((loginError) => {
              this.setState({ isLoading: false });
              Alert.alert('Erro ao fazer login', loginError.message);
            });
        } else {
          this.setState({ isLoading: false });
          Alert.alert('Erro', error.message);
        }
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/Efeito linhas.png')} style={styles.backgroundLogo} />

        <View>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
        </View>
        
        <View>
          <Image source={require('../assets/vetor log.png')} style={styles.logo1} />
        </View>

        <TextInput
          color="#1E1E1E"
          placeholderTextColor="#1E1E1E"
          placeholder="Digite seu nome"
          style={[styles.inputEmail, { marginBottom: 20 }]}
          value={this.state.displayName}
          onChangeText={this.updateInputVal}
        />

        <TouchableOpacity style={[styles.buttonEnter, { marginBottom: 20 }]} onPress={this.registerUser}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.clique, { marginBottom: 20 }]} onPress={() => {
          LayoutAnimation.easeInEaseOut();
          this.props.navigation.navigate('Login');
        }}>
          <Text style={styles.textForgotEnter}>Já tem uma conta? Clique aqui.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
