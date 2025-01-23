import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Animated, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import MapView, { Marker } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';

// Dados do Supabase
const supabaseUrl = 'https://feibkjxiwztfupcgqync.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlaWJranhpd3p0ZnVwY2dxeW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTk4NjksImV4cCI6MjA0Mjc3NTg2OX0.t1l29bXPcGPDXWSgnUP-nCNp1Qzesys6zSTFUcCjnpc';
const supabase = createClient(supabaseUrl, supabaseKey);

// API Key do Google Maps
const GOOGLE_MAPS_API_KEY = 'AIzaSyCkt8SysTxQBhVixgZVljSrsmJyr5LHuKc';

const ProfileScreen = ({ route, navigation }) => {
  const { loja, categoriaSelecionada } = route.params;
  const [isFavorited, setIsFavorited] = useState(false);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [location, setLocation] = useState({ latitude: -3.7327, longitude: -38.5267 });
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [scaleAnim] = useState(new Animated.Value(1));

  const fetchClientData = async () => {
    try {
      const { data: clienteData, error: clienteError } = await supabase
        .from('clientes')
        .select('categories_id, nota, descricao, endereco, wpp')
        .eq('razao_social', loja)
        .single();

      if (clienteError) {
        console.error('Erro ao buscar dados do cliente:', clienteError);
        return;
      }

      setRating(clienteData.nota);
      setDescription(clienteData.descricao);
      setPhone(clienteData.wpp);
      setAddress(clienteData.endereco);

      if (clienteData.endereco) {
        geocodeAddress(clienteData.endereco);
      }

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

  const geocodeAddress = async (endereco) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: endereco,
          key: GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setLocation({ latitude: lat, longitude: lng });
      } else {
        console.log('Nenhuma coordenada encontrada para o endereço.');
      }
    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error);
    }
  };

  const saveFavorite = async () => {
    try {
      const { error } = await supabase
        .from('clientes')
        .update({ favorito: 'S' })
        .eq('razao_social', loja);
      if (error) throw error;

      setIsFavorited(true);
      Alert.alert("Favoritos", "Item adicionado aos favoritos!");
    } catch (error) {
      console.error('Erro ao favoritar:', error);
    }
  };

  const removeFavorite = async () => {
    try {
      const { error } = await supabase
        .from('clientes')
        .update({ favorito: 'N' })
        .eq('razao_social', loja);
      if (error) throw error;

      setIsFavorited(false);
      Alert.alert("Favoritos", "Item removido dos favoritos.");
    } catch (error) {
      console.error('Erro ao desfavoritar:', error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavorite();
    } else {
      saveFavorite();
    }
  };

  const handleWhatsAppPress = () => {
    if (phone) {
      const url = `whatsapp://send?phone=${phone}&text=Olá, gostaria de mais informações!`;
      Linking.openURL(url).catch(() =>
        Alert.alert('Erro', 'Não foi possível abrir o WhatsApp')
      );
    } else {
      Alert.alert('Erro', 'Número de telefone não disponível');
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

  useEffect(() => {
    if (isFavorited) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFavorited]);

  const toggleDescription = () => setExpanded(!expanded);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          route.params.fromDashboard
            ? navigation.navigate('Dashboard')
            : navigation.navigate('CategoryClientsScreen', { categoria: categoriaSelecionada })
        }
        style={styles.backButton}
      >
        <Feather name="arrow-left" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Svg width={28} height={28} viewBox="0 0 24 24">
            <Path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isFavorited ? 'red' : 'none'}
              stroke="black"
              strokeWidth={isFavorited ? 0 : 2}
            />
          </Svg>
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.logo}
        />
        <Text style={styles.title}>{loja}</Text>
        <Text style={styles.subtitle}>{category}</Text>
        <View style={styles.rating}>
          <Image
            source={require('../assets/star.png')}
            style={styles.starIcon}
          />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {expanded ? description : `${description.substring(0, 110)}...`}
          {description.length > 110 && (
            <Text style={styles.readMore} onPress={toggleDescription}>
              {expanded ? ' Ler menos' : ' Ler mais'}
            </Text>
          )}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <Text style={styles.contact}>Telefone: {phone}</Text>
        <Text style={styles.contact}>E-mail: testeprototipo@salaodapri.com</Text>
        <TouchableOpacity style={styles.button} onPress={handleWhatsAppPress}>
          <Feather name="send" size={18} color="white" />
          <Text style={styles.buttonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Localização</Text>
        <Text style={styles.location}>{address}</Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 13,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 18,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
  contact: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 10,
    height: 38,
    width: 160
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    top: -3
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 180,
    marginStart: 'auto',
    marginEnd: 'auto',
    borderRadius: 15,
  },
  readMore: {
    color: 'blue',
    marginTop: 5,
  },
  mapContainer: {
    width: '90%',
    height: 180,
    marginStart: 'auto',
    marginEnd: 'auto',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
});

export default ProfileScreen;
