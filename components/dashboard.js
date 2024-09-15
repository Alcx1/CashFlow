import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ícones do Feather
import { initializeApp } from 'firebase/app'; // Firebase para autenticação
import { getAuth, signOut } from 'firebase/auth'; // Funções de autenticação do Firebase
import firebaseConfig from '../database/firebase'; // Configuração do Firebase
import styles from './Styles/stylesDashboard'; // Importa o arquivo de estilos
import { SafeAreaView } from 'react-native-safe-area-context'; // Componente para lidar com áreas seguras em dispositivos

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
      email: '',
      searchQuery: '',
      categories: [
        { id: 1, name: 'Beleza', icon: 'star' },
        { id: 2, name: 'Educação', icon: 'book' },
        { id: 3, name: 'Lojas', icon: 'shopping-bag' },
        { id: 4, name: 'Mercado', icon: 'shopping-cart' },
        { id: 5, name: 'Pet', icon: 'heart' },
        { id: 6, name: 'Restaurantes', icon: 'coffee' },
        { id: 7, name: 'Saúde', icon: 'activity' },
        { id: 8, name: 'Serviços', icon: 'tool' },
        { id: 9, name: 'Tecnologia', icon: 'headphones' },
      ],
      showArrow: true, // Estado para controlar a visibilidade da seta na seção destaques
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

  filterCategories = () => {
    const { searchQuery, categories } = this.state;
    if (!searchQuery.trim()) {
      return categories;
    }
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    if (contentOffsetX > 20) {
      this.setState({ showArrow: false }); // Esconde a seta quando o usuário rola
    } else {
      this.setState({ showArrow: true }); // Mostra a seta quando o ScrollView está no início
    }
  };

  render() {
    const { displayName, email, searchQuery, showArrow } = this.state;
    const filteredCategories = this.filterCategories();

    return (
      <SafeAreaView style={styles.container}>
        <Feather name="user" size={25} color="#1E1E1E" style={styles.profileIcon} />
        <Text style={styles.userEmail} numberOfLines={1} ellipsizeMode="tail">
          {email || 'Usuário não logado'}
        </Text>

        <View style={styles.header}>
          <View style={styles.inputArea}>
            <Feather name="search" size={25} color="#fff" />
            <TextInput
              style={styles.input}
              placeholder="Buscar"
              placeholderTextColor="#AAAAAA"
              value={searchQuery}
              onChangeText={(text) => this.setState({ searchQuery: text })}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Categorias</Text>
        <ScrollView contentContainerStyle={styles.categoriesContainer}>
          {filteredCategories.map(category => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <Feather name={category.icon} size={40} color="#333" />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle2}>Destaques</Text>

        {/* Adiciona a seta de navegação na seção de Destaques */}
        {showArrow && (
          <Feather name="chevron-left" size={32} color="black" style={styles.arrow} />
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.destaquesScroll}
          onScroll={this.handleScroll} // Chama a função ao rolar
          scrollEventThrottle={16} // Melhor desempenho na detecção de scroll
        >
          <View style={styles.destaqueItem}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
            <View style={styles.estrelas}>
              <Feather name="star" size={14} color="#FFD700" />
              <Feather name="star" size={14} color="#FFD700" />
              <Feather name="star" size={14} color="#FFD700" />
              <Feather name="star" size={14} color="#FFD700" />
              <Feather name="star" size={14} color="#1E1E1E" />
            </View>
            <Text style={styles.destaqueLoja}>Loja Exemplo</Text>
            <Text style={styles.destaqueCategoria}>Categoria</Text>
          </View>

          <View style={styles.destaqueItem}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
            <View style={styles.estrelas}>
              <Feather name="star" size={14} color="#FFD700" />
              <Feather name="star" size={14} color="#FFD700" />
              <Feather name="star" size={14} color="#FFD700" />
              <Feather name="star" size={14} color="#FFD700" />
              <Feather name="star" size={14} color="#1E1E1E" />
            </View>
            <Text style={styles.destaqueLoja}>Loja Exemplo</Text>
            <Text style={styles.destaqueCategoria}>Categoria</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}