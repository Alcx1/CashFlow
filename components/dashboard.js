import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TextInput, ScrollView, Dimensions,
  TouchableOpacity, Image, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import firebaseConfig from '../database/firebase';
import { createClient } from '@supabase/supabase-js';
import styles from './Styles/stylesDashboard';
import clientscategory from './Styles/ClientsCategory';
import filteredStyles from './Styles/Filtrados';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window'); 

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
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
      destaques: [],
      allClientes: [],
      showArrow: true,
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
      this.fetchCategories();
      this.fetchDestaques();
      this.fetchAllClientes();
    } else {
      Alert.alert('Sessão Expirada', 'Por favor, faça login novamente.');
      this.props.navigation.navigate('Login');
    }
  }

  fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, icon');
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

  fetchDestaques = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*, categories(name, icon)')
        .order('nota', { ascending: false })
        .limit(5);
      if (error) {
        throw error;
      }
      this.setState({ destaques: data });
    } catch (error) {
      console.error('Erro ao buscar destaques:', error.message);
      Alert.alert('Erro', 'Não foi possível carregar os destaques.');
    }
  };

  fetchAllClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*, categories(name, icon)');
      if (error) {
        throw error;
      }
      this.setState({ allClientes: data });
    } catch (error) {
      console.error('Erro ao buscar todos os clientes:', error.message);
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    }
  };

  signOut = () => {
    signOut(auth)
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  filterClientes = () => {
    const { searchQuery, allClientes } = this.state;
    if (!searchQuery.trim()) {
      return [];
    }
    return allClientes.filter(cliente =>
      cliente.razao_social.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  filterCategories = () => {
    const { searchQuery, categories } = this.state;
    if (searchQuery.trim()) {
      return [];
    }
    return categories;
  };

  handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    if (contentOffsetX > 20) {
      this.setState({ showArrow: false });
    } else {
      this.setState({ showArrow: true });
    }
  };

  render() {
    const { displayName, searchQuery, showArrow, destaques } = this.state;
    const filteredClientes = this.filterClientes();
    const filteredCategories = this.filterCategories();

    const isSearchActive = searchQuery.trim() !== '';

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

        {isSearchActive ? (
          <>
            <Text style={filteredStyles.sectionTitle2}>Clientes</Text>
            <ScrollView contentContainerStyle={filteredStyles.clientesContainer}>
              {filteredClientes.length > 0 ? (
                filteredClientes.map(cliente => (
                  <TouchableOpacity
                    key={cliente.id}
                    style={filteredStyles.clienteItem}
                    onPress={() => this.props.navigation.navigate('ProfileScreen', { loja: destaque.razao_social, fromDashboard: true })}
                  >
                    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={filteredStyles.logo} />
                    <Text style={filteredStyles.clienteName}>
                      {cliente.razao_social.length > 30
                        ? `${cliente.razao_social.substring(0, 30)}...`
                        : cliente.razao_social}
                    </Text>
                    <View style={filteredStyles.estrelas}>
                      <Image
                        source={require('../assets/star.png')}
                        style={filteredStyles.starIcon}
                      />
                      <Text style={filteredStyles.notaText}>
                        {cliente.nota !== null ? cliente.nota.toFixed(1) : 'N/A'}
                      </Text>
                      <Text style={filteredStyles.destaqueCategoria}>{cliente.categories.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noResults}>Nenhum cliente encontrado.</Text>
              )}
            </ScrollView>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <ScrollView contentContainerStyle={styles.categoriesContainer}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.categoryItem}
                    onPress={() => this.props.navigation.navigate('CategoryClientsScreen', { categoryId: category.id, categoryName: category.name })}
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
              onScroll={this.handleScroll}
              scrollEventThrottle={16}
            >
              {destaques.length > 0 ? (
                destaques.map(destaque => (
                  <TouchableOpacity
                    key={destaque.id}
                    style={styles.destaqueItem}
                    onPress={() => this.props.navigation.navigate('ProfileScreen', { loja: destaque.razao_social, fromDashboard: true })}
                  >
                    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
                    <View style={styles.estrelas}>
                      <Image
                        source={require('../assets/star.png')}
                        style={styles.starIcon}
                      />
                      <Text style={styles.notaText}>
                        {destaque.nota !== null ? destaque.nota.toFixed(1) : 'N/A'}
                      </Text>
                    </View>
                    <Text style={styles.destaqueLoja}>
                      {destaque.razao_social.length > 18
                        ? `${destaque.razao_social.substring(0, 18)}...`
                        : destaque.razao_social}
                    </Text>
                    <Text style={styles.destaqueCategoria}>{destaque.categories.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noResults}>Nenhum destaque disponível.</Text>
              )}
            </ScrollView>
          </>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={this.signOut}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
