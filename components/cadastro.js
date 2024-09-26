import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa o ícone de seta
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebaseConfig from '../database/firebase';
import styles from './Styles/styles';

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ativa animações em dispositivos Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }

  // Atualiza os valores de entrada do formulário
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  // Função de registro de usuário
  registerUser = () => {
    const { email, password, displayName } = this.state;

    // Valida se os campos estão preenchidos
    if (email === '' || password === '' || displayName === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    this.setState({ isLoading: true });

    // Registra o usuário com Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Atualiza o perfil do usuário com o displayName
        updateProfile(res.user, {
          displayName: displayName,
        })
        .then(() => {
          Alert.alert('Sucesso', `Registrado como: ${res.user.email}`);
          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: '',
          });
          LayoutAnimation.easeInEaseOut();
          this.props.navigation.navigate('Login'); // Navega para a tela de login
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        Alert.alert('Erro', error.message); // Mostra uma mensagem de erro
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
        {/* Botão de retorno */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            this.props.navigation.goBack(); // Navega para a tela anterior
          }}
        >
          <Icon name="arrow-back" size={24} color="#1E1E1E" />
        </TouchableOpacity>

        <Text style={styles.saudacao}>Olá,</Text>
        <Text style={styles.saudacao2}>Vamos realizar seu cadastro.</Text>

        {/* Campo de entrada de Nome */}
        <TextInput
          color="#1E1E1E"
          placeholderTextColor="#1E1E1E"
          placeholder="Nome"
          style={styles.inputEmail}
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />

        {/* Campo de entrada de E-mail */}
        <TextInput
          color="#1E1E1E"
          placeholderTextColor="#1E1E1E"
          placeholder="Seu e-mail"
          style={styles.inputEmail}
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />

        {/* Campo de entrada de Senha */}
        <TextInput
          color="#1E1E1E"
          placeholderTextColor="#1E1E1E"
          placeholder="Sua senha"
          secureTextEntry={true}
          style={styles.inputSenha}
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
        />

        {/* Botão de Registrar */}
        <TouchableOpacity style={styles.buttonRegister} onPress={this.registerUser}>
          <Text style={styles.textButton}>Registrar</Text>
        </TouchableOpacity>

        {/* Link para Login */}
        <TouchableOpacity onPress={() => {
          LayoutAnimation.easeInEaseOut();
          this.props.navigation.navigate('Login');
        }}>
          <Text style={styles.textForgot}>Já tem uma conta? Clique aqui.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
