import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ícones do Feather
import { initializeApp } from 'firebase/app'; // Firebase para autenticação
import { getAuth, signOut } from 'firebase/auth'; // Funções de autenticação do Firebase
import firebaseConfig from '../database/firebase'; // Configuração do Firebase
import { createClient } from '@supabase/supabase-js'; // Supabase Client
import styles from './Styles/stylesDashboard'; // Importa o arquivo de estilos
import { SafeAreaView } from 'react-native-safe-area-context'; 
import CategoryClientsScreen from './CategoryClientsScreen'// Componente para lidar com áreas seguras em dispositivos

const { width } = Dimensions.get('window');

// Inicializar o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Inicializar Supabase
const supabaseUrl = 'https://feibkjxiwztfupcgqync.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlaWJranhpd3p0ZnVwY2dxeW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTk4NjksImV4cCI6MjA0Mjc3NTg2OX0.t1l29bXPcGPDXWSgnUP-nCNp1Qzesys6zSTFUcCjnpc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      displayName: '',
      email: '',
      searchQuery: '',
      categories: [],
      destaques: [],   // Estado para armazenar os destaques
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
      // Buscar categorias e destaques do Supabase
      this.fetchCategories();
      this.fetchDestaques();
    } else {
      Alert.alert('Sessão Expirada', 'Por favor, faça login novamente.');
      this.props.navigation.navigate('Login');
    }
  }

  // Função para buscar categorias do Supabase
  fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, icon'); // Pegar também o ícone associado à categoria

      if (error) {
        throw error;
      }

      if (data) {
        this.setState({ categories: data });
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error.message);
      Alert.alert('Erro', 'Não foi possível carregar as categorias.');
    }
  };

  // Função para buscar destaques do Supabase, incluindo a categoria pela chave estrangeira
  fetchDestaques = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes') // Nome da sua tabela de clientes
        .select('*, categories(name, icon)') // Faz o join com a tabela categories usando a chave estrangeira categories_id
        .order('nota', { ascending: false }) // Ordena pelas melhores notas
        .limit(5); // Limitar a 5 lojas com melhores notas

      if (error) {
        throw error;
      }

      this.setState({ destaques: data });
    } catch (error) {
      console.error('Erro ao buscar destaques:', error.message);
      Alert.alert('Erro', 'Não foi possível carregar os destaques.');
    }
  };

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
    const { displayName, email, searchQuery, showArrow, destaques, categories } = this.state;
    const filteredCategories = this.filterCategories();

    return (
      <SafeAreaView style={styles.container}>

        <Feather name="user" size={35} color="#1E1E1E" style={styles.profileIcon} />


        <Text style={styles.user}>
          {displayName ? `Olá, ${displayName}!` : 'Olá!'}
        </Text>
        <Text style={styles.usersaudacao}>
          {displayName ? 'Seja bem-vindo(a)' : 'Por favor, faça login.'}
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
          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => this.props.navigation.navigate('CategoryClientsScreen', { categoryId: category.id, categoryName: category.name })} // Navegar para uma nova tela com o categoryId
              >
                <Feather name={category.icon} size={40} color="#333" />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>

            ))
          ) : (
            <Text style={styles.noResults}>Nenhuma categoria encontrada.</Text>
          )}
        </ScrollView>


        <Text style={styles.sectionTitle2}>Destaques</Text>


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
          {destaques.length > 0 ? (
            destaques.map(destaque => (
              <TouchableOpacity
                key={destaque.id}
                style={styles.destaqueItem}
                onPress={() => this.props.navigation.navigate('ProfileScreen', { loja: destaque.razao_social })}
              >
                <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
                <View style={styles.estrelas}>
                  <Feather name="star" size={14} color="#FFD700" />
                  <Text style={styles.notaText}>
                    {destaque.nota !== null ? destaque.nota.toFixed(1) : 'N/A'}
                  </Text>
                </View>
                <Text style={styles.destaqueLoja}>{destaque.razao_social}</Text>
                <Text style={styles.destaqueCategoria}>{destaque.categories.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResults}>Nenhum destaque disponível.</Text>
          )}
        </ScrollView>


        <TouchableOpacity style={styles.logoutButton} onPress={this.signOut}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
