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
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import firebaseConfig from '../Services/firebase';
import styles from './Styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

  updateInputVal = (val, field) => {
    this.setState({ [field]: val });
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
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Atenção', 'Informe seu login, por gentileza.');
      return;
    }

    this.setState({ isLoading: true });

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isLoading: true, email: '', password: '' });
        this.saveCredentials();
        this.props.navigation.navigate('Dashboard');
      })
      .catch(() => {
        this.setState({ isLoading: false });
        Alert.alert('Erro', 'E-mail ou senha incorretos');
      });
  };

  resetPassword = () => {
    const { email } = this.state;
    if (email.trim() === '') {
      Alert.alert('Atenção', 'Por favor, insira o seu e-mail para redefinir sua senha.');
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
          <ActivityIndicator size="large" color="#FF9A00" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Olá,</Text>
          <Text style={styles.welcomeText2}>Seja bem-vindo(a).</Text>
          <Text style={styles.subtitle}>Entre para acessar suas despesas</Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="at" size={20} color="#B3B3B3" style={styles.inputIcon} />
          <TextInput
            placeholder="Seu e-mail"
            placeholderTextColor="#B3B3B3"
            style={styles.inputWithIcon}
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#B3B3B3" style={styles.inputIcon} />
          <TextInput
            placeholder="Sua senha"
            placeholderTextColor="#B3B3B3"
            secureTextEntry
            style={styles.inputWithIcon}
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
          />
        </View>

        <TouchableOpacity onPress={this.resetPassword} style={{ width: '80%' }}>
          <Text style={styles.textButtonForgot}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonEnter} onPress={this.userLogin}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>

         <TouchableOpacity
          style={styles.clique}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.textForgotEnter}>Não possui conta? Cadastra-se aqui</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
