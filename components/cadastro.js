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

  registerUser = () => {
    const { email, password, displayName } = this.state;

    if (email === '' || password === '' || displayName === '') {
      Alert.alert('Erro', 'Insira seus dados para se registrar.');
      return;
    }

    this.setState({ isLoading: true });

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: displayName,
        }).then(() => {
          Alert.alert('Sucesso', `Registrado como: ${res.user.email}`);
          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: '',
          });
          LayoutAnimation.easeInEaseOut();
          this.props.navigation.navigate('Login');
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        Alert.alert('Erro', error.message);
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

        <TextInput
          color="#1E1E1E"
          placeholderTextColor="#1E1E1E"
          placeholder="Nome"
          style={styles.inputEmail}
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />

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
          placeholder="Sua senha"
          secureTextEntry={true}
          style={styles.inputSenha}
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
        />

        <TouchableOpacity style={styles.buttonRegister} onPress={this.registerUser}>
          <Text style={styles.textButton}>Registrar</Text>
        </TouchableOpacity>

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
