import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import New from './services';
import Comentarios from './Comentarios';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import firebaseConfig from '../database/firebase';
import styles from './Styles/stylesDashboard';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

// Inicializar o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      displayName: '',
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      this.setState({
        displayName: user.displayName,
        uid: user.uid,
      });
    }
  }

  signOut = () => {
    signOut(auth)
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { displayName } = this.state;

    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.inputArea}>
              <Feather name="search" size={25} color="#fff" />
              <TextInput
                style={styles.input}
                placeholder="Pesquise um serviço aqui."
                placeholderTextColor="#AAAAAA"
              />
            </View>
          </View>
      </SafeAreaView>
    );
  }
}
