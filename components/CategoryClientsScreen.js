import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ícones
import { createClient } from '@supabase/supabase-js'; // Supabase Client

// Inicializar Supabase
const supabaseUrl = 'https://feibkjxiwztfupcgqync.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlaWJranhpd3p0ZnVwY2dxeW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTk4NjksImV4cCI6MjA0Mjc3NTg2OX0.t1l29bXPcGPDXWSgnUP-nCNp1Qzesys6zSTFUcCjnpc      ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default class CategoryClientsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: this.props.route.params.categoryId,
      categoryName: this.props.route.params.categoryName,
      clientes: [], // Lista de clientes da categoria
    };
  }

  componentDidMount() {
    this.fetchCategoryClients();
  }

  // Função para buscar os clientes de uma categoria
  fetchCategoryClients = async () => {
    const { categoryId } = this.state;

    try {
      // Ajuste o SELECT para buscar os clientes com base no categories_id
      const { data, error } = await supabase
        .from('clientes') // Nome da tabela de clientes
        .select('id, razao_social, nota, categories_id') // Seleciona apenas os campos necessários
        .eq('categories_id', categoryId); // Filtra os clientes pelo categories_id

      if (error) {
        throw error;
      }

      if (data) {
        this.setState({ clientes: data });
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error.message);
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    }
  };

  // Função para truncar a razao_social, se necessário
  truncateName = (name, maxLength = 18) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };

  render() {
    const { categoryName, clientes } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Clientes na categoria: {categoryName}</Text>

        <ScrollView contentContainerStyle={styles.clientesContainer}>
          {clientes.length > 0 ? (
            clientes.map(cliente => (
              <TouchableOpacity
                key={cliente.id}
                style={styles.clienteItem}
                onPress={() => this.props.navigation.navigate('ProfileScreen', { loja: cliente.razao_social })}
              >
                <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
                <Text style={styles.clienteName}>{this.truncateName(cliente.razao_social)}</Text>
                <View style={styles.estrelas}>
                  <Feather name="star" size={14} color="#FFD700" />
                  <Text style={styles.notaText}>
                    {cliente.nota !== null ? cliente.nota.toFixed(1) : 'N/A'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResults}>Nenhum cliente encontrado nesta categoria.</Text>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  clientesContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  clienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  clienteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  estrelas: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  notaText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#FFD700',
  },
  noResults: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
