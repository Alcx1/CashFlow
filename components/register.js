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
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import firebaseConfig from '../Services/firebase';
import styles from './Styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  updateInputVal = (val, field) => {
    this.setState({ [field]: val });
  };

  registerUser = () => {
    const { email, password } = this.state;

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    this.setState({ isLoading: true });

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        this.setState({ isLoading: false, email: '', password: '' });
        LayoutAnimation.easeInEaseOut();
        this.props.navigation.navigate('Dashboard');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              Alert.alert('Bem-vindo de volta!', email);
              this.setState({ isLoading: false, email: '', password: '' });
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

  forgotPassword = () => {
    const { email } = this.state;

    if (email.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira seu e-mail no campo e-mail.');
      return;
    }

    this.setState({ isLoading: true });

    sendPasswordResetEmail(auth, email)
      .then(() => {
        this.setState({ isLoading: false });
        Alert.alert('Sucesso!', 'Um link de redefinição de senha foi enviado para seu e-mail.');
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Erro', 'E-mail não está cadastrado. Verifique e tente novamente.');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Erro', 'Formato do e-mail invalido.');
        } else {
          Alert.alert('Erro', 'Ocorreu um erro. Tente novamente mais tarde.');
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
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Olá,</Text>
          <Text style={styles.welcomeText2}>Seja bem-vindo(a).</Text>
          <Text style={styles.subtitle}>Cadastre-se para acompanhar suas despesas</Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="at" size={20} color="#B3B3B3" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="#B3B3B3"
            style={styles.inputWithIcon}
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#B3B3B3" style={styles.inputIcon} />
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#B3B3B3"
            secureTextEntry
            style={styles.inputWithIcon}
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
          />
        </View>

        <TouchableOpacity style={styles.buttonEnter} onPress={this.registerUser}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clique}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={styles.textForgotEnter}>Já tem uma conta? Entrar.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
