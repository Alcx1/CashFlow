import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
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
      email:'',
    };
  }

  componentDidMount() {
    const user = auth.currentUser;
    if (user) {
      this.setState({
        displayName: user.displayName,
        uid: user.uid,
        email: user.email,
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
    const { displayName, email } = this.state;

    return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.userEmail}>{email || 'Usuário não logado'}</Text>
      <View style={styles.header}>
        <View style={styles.loginArea}>
          <TouchableOpacity onPress={this.signOut}>
            <Feather name="user" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputArea}>
          <Feather name="search" size={25} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Pesquise um serviço aqui."
            placeholderTextColor="#AAAAAA"
          />
        </View>
      </View>
          <ScrollView contentContainerStyle={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="star" size={40} color="#333" />
            <Text style={styles.categoryText}>Beleza</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="book" size={40} color="#333" />
            <Text style={styles.categoryText}>Educação</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="shopping-bag" size={40} color="#333" />
            <Text style={styles.categoryText}>Lojas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="shopping-cart" size={40} color="#333" />
            <Text style={styles.categoryText}>Mercado</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="heart" size={40} color="#333" />
            <Text style={styles.categoryText}>Pet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="coffee" size={40} color="#333" />
            <Text style={styles.categoryText}>Restaurantes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="activity" size={40} color="#333" />
            <Text style={styles.categoryText}>Saúde</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="tool" size={40} color="#333" />
            <Text style={styles.categoryText}>Serviços</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Feather name="headphones" size={40} color="#333" />
            <Text style={styles.categoryText}>Tecnologia</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
