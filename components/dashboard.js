import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { createClient } from '@supabase/supabase-js';

// Configuração do Firebase
import firebaseConfig from '../Services/firebase';
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Configuração do Supabase
const supabaseUrl = 'https://<sua-supabase-url>';
const supabaseKey = '<sua-supabase-key>';
const supabase = createClient(supabaseUrl, supabaseKey);

// Importação dos estilos
import styles from './Styles/DashboardStyles';
import { FlatList } from 'react-native-gesture-handler';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      displayName: '',
      email: '',
      greeting: '',
      profileImage: null,
      saldoGeral: 7500.00,
      transacoes:[
        { id: '1', tipo: 'Entrada', descricao: 'Salário', valor: 7500.0 }
      ]
    };
  }

  componentDidMount() {
    const { email } = auth.currentUser;
    const hours = new Date().getHours();
    let greeting = '';

    if (hours < 12) {
      greeting = 'Bom dia';
    } else if (hours < 18) {
      greeting = 'Boa tarde';
    } else {
      greeting = 'Boa noite';
    }

    this.setState({ email, greeting });
  }

  pickImage = async () => {
    // Pedir permissão para acessar a galeria
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('É necessária permissão para acessar a galeria.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE], // Correção da depreciação
      allowsEditing: true,
      aspect: [1, 1], // Define proporção quadrada
      quality: 1,
    });

    if (!result.canceled) {
      this.setState({ profileImage: result.assets[0].uri });
    }
  };
  renderTransacao = ({ item }) => {
    return (
      <View style={styles.transacaoItem}>
        <Text style={styles.transacaoTipo}>{item.tipo}</Text>
        <Text style={styles.transacaoDescricao}>{item.descricao}</Text>
        <Text
          style={[
            styles.transacaoValor,
            { color: item.valor > 0 ? 'green' : 'red' },
          ]}
        >
          R$ {item.valor.toFixed(2)}
        </Text>
      </View>
    );
  };


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.greetingContainer}>
          <TouchableOpacity onPress={this.pickImage}>
            <Image
              source={
                this.state.profileImage
                  ? { uri: this.state.profileImage }
                  : require('../assets/default-profile.png') // Imagem padrão
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.greetingText}>
            {this.state.greeting}, Emanuel Alec.
          </Text>
        </View>
        <View style={styles.saldoContainer}>
          <Text style={styles.saldoTitulo}>Saldo Geral:</Text>
          <Text style={styles.saldoValor}>R$ 7,500.00</Text>
        </View>
        <View style={styles.transacoesContainer}>
        <Text style={styles.transacoesTitulo}>
        Últimas Transações:
        </Text>
        <FlatList>
            data={this.state.transacoes}
            renderItem{this.renderTransacao}
            keyExtrator={(item) =>item.id}
        </FlatList>

        </View>
              

      </SafeAreaView>
    );
  }
}
