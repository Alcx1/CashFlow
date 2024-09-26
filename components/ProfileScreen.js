import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://feibkjxiwztfupcgqync.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlaWJranhpd3p0ZnVwY2dxeW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTk4NjksImV4cCI6MjA0Mjc3NTg2OX0.t1l29bXPcGPDXWSgnUP-nCNp1Qzesys6zSTFUcCjnpc';  // Sua chave de API aqui
const supabase = createClient(supabaseUrl, supabaseKey);

const ProfileScreen = ({ route, navigation }) => {
  const { loja } = route.params;
  const [isFavorited, setIsFavorited] = useState(false);
  const [category, setCategory] = useState(''); 
  const [rating, setRating] = useState(0); 
  const [description, setDescription] = useState(''); 

  const fetchClientData = async () => {
    try {
      const { data: clienteData, error: clienteError } = await supabase
        .from('clientes')
        .select('categories_id, nota, descricao')
        .eq('razao_social', loja)
        .single();

      if (clienteError) {
        console.error('Erro ao buscar dados do cliente:', clienteError);
        return;
      }

      setRating(clienteData.nota);
      setDescription(clienteData.descricao);

      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('name')
        .eq('id', clienteData.categories_id)
        .single();

      if (categoryError) {
        console.error('Erro ao buscar categoria:', categoryError);
        return;
      }

      setCategory(categoryData.name);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const saveFavorite = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      const favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];

      if (!favoritesArray.includes(loja)) {
        favoritesArray.push(loja);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
        setIsFavorited(true);
        Alert.alert('Favorito adicionado!', `${loja} foi adicionado aos favoritos.`);
      } else {
        Alert.alert('Atenção', `${loja} já está nos favoritos.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      const favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];

      const updatedFavorites = favoritesArray.filter(fav => fav !== loja);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
      Alert.alert('Favorito removido!', `${loja} foi removido dos favoritos.`);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavorite();
    } else {
      saveFavorite();
    }
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const existingFavorites = await AsyncStorage.getItem('favorites');
        const favoritesArray = existingFavorites ? JSON.parse(existingFavorites) : [];
        if (favoritesArray.includes(loja)) {
          setIsFavorited(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkFavoriteStatus();
    fetchClientData();
  }, [loja]);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Feather
          key={i}
          name="star"
          size={14}
          color={i <= rating ? "#FFD700" : "#1E1E1E"}
        />
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Feather
          name={isFavorited ? "heart" : "heart"}
          size={24}
          color={isFavorited ? "red" : "black"}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.logo}
        />
        <Text style={styles.title}>{loja}</Text>
        <Text style={styles.subtitle}>{category}</Text> 
        <View style={styles.rating}>
          {renderStars()}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <Text style={styles.contact}>Telefone: (85)985645776</Text>
        <Text style={styles.contact}>E-mail: testeprototipo@salaodapri.com</Text>
        <TouchableOpacity style={styles.button}>
          <Feather name="message-circle" size={18} color="white" />
          <Text style={styles.buttonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Localização</Text>
        <Text style={styles.location}>Endereço fictício, 123</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  contact: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00b300',
    padding: 5,
    left: 0,
    marginTop: 20,
    width: '45%',
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  location: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProfileScreen;
