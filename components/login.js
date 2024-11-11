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
  Platform,
  Switch,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import firebaseConfig from '../database/firebase';
import styles from './Styles/styles';

const { width, height } = Dimensions.get('window');

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

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
      rememberMe: false,
    };
  }

  async componentDidMount() {
    const savedEmail = await AsyncStorage.getItem('email');
    const savedPassword = await AsyncStorage.getItem('password');
    if (savedEmail && savedPassword) {
      this.setState({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  toggleRememberMe = () => {
    this.setState((prevState) => ({ rememberMe: !prevState.rememberMe }));
  };

  saveCredentials = async () => {
    const { email, password, rememberMe } = this.state;
    if (rememberMe) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
    } else {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    }
  };

  userLogin = () => {
    const { email, password } = this.state;

    if (email === '' || password === '') {
      Alert.alert('Atenção', 'Informe seu login, por gentileza.');
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });

      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          LayoutAnimation.easeInEaseOut();
          this.setState({
            isLoading: false,
            email: '',
            password: '',
          });
          this.saveCredentials();
          this.props.navigation.navigate('Dashboard');
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          Alert.alert('Erro', 'E-mail ou senha incorretos');
        });
    }
  };

  resetPassword = () => {
    const { email } = this.state;

    if (email === '') {
      Alert.alert('Atenção', 'Por favor, insira o seu e-mail para redefinir sua senha.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Sucesso', 'Um link para redefinir sua senha foi enviado para o seu e-mail.');
      })
      .catch((error) => {
        Alert.alert('Erro', 'Ocorreu um erro. Verifique se o e-mail está correto.');
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
        <Image source={require('../assets/Efeito linhas.png')} style={styles.backgroundLogo2} />
        <Text style={styles.saudacao}>Olá,</Text>
        <Text style={styles.saudacao2}>Seja bem vindo(a).</Text>

        
        <TextInput
          color="#1E1E1E"
          placeholderTextColor="#1E1E1E"
          placeholder="Seu e-mail"
          style={styles.inputEmailLogin}
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
        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeText}>Lembrar Login</Text>
          <Switch
            value={this.state.rememberMe}
            onValueChange={this.toggleRememberMe}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => this.userLogin()}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        
        

        <TouchableOpacity onPress={() => this.resetPassword()}>
          <Text style={styles.textForgot}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            this.props.navigation.navigate('Cadastro');
          }}>
          <Text style={styles.textForgot}>Não possui conta? Entre aqui.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
