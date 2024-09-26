import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Importe a função de redefinição de senha
import firebaseConfig from '../database/firebase';  // Certifique-se de importar sua configuração
import styles from './Styles/styles'; // Importa estilos globais

// Inicialize o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);  // Inicialize o serviço de autenticação

// Habilita o LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    const { email, password } = this.state;

    if (email === '' || password === '') {
      alert('Informe seu login, por gentileza.');
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });

      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          LayoutAnimation.easeInEaseOut(); // Animação para navegação fluida
          this.setState({
            isLoading: false,
            email: '',
            password: '',
          });
          this.props.navigation.navigate('Dashboard');
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          alert('E-mail ou senha incorretos');
        });
    }
  };

  // Função para resetar senha
  resetPassword = () => {
    const { email } = this.state;

    if (email === '') {
      alert('Por favor, insira o seu e-mail para redefinir sua senha.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Um link para redefinir sua senha foi enviado para o seu e-mail.');
      })
      .catch((error) => {
        alert('Ocorreu um erro. Verifique se o e-mail está correto.');
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#FF9A00" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.saudacao}>Olá,</Text>
        <Text style={styles.saudacao2}>Seja bem vindo(a).</Text>

        <TextInput
          color="#1E1E1E"
          placeholderTextColor="#1E1E1E"
          placeholder="Seu e-mail"
          style={styles.inputEmail}
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          color="#1E1E1E"
          placeholderTextColor="#1E1E1E"
          secureTextEntry={true}
          placeholder="Sua senha"
          style={styles.inputSenha}
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
        />

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => this.userLogin()}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.resetPassword()}>
          <Text style={styles.textForgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.easeInEaseOut(); // Animação para navegação fluida
            this.props.navigation.navigate('Cadastro');
          }}>
          <Text style={styles.textForgot}>Não possui conta? Clique aqui.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
