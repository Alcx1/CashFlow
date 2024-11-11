import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const supabaseUrl = 'https://feibkjxiwztfupcgqync.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlaWJranhpd3p0ZnVwY2dxeW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxOTk4NjksImV4cCI6MjA0Mjc3NTg2OX0.t1l29bXPcGPDXWSgnUP-nCNp1Qzesys6zSTFUcCjnpc';
const supabase = createClient(supabaseUrl, supabaseKey);

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('id, razao_social, nota, endereco, descricao, wpp')
        .eq('favorito', 'S');

      if (error) {
        console.error('Erro ao buscar favoritos:', error.message);
      } else {
        setFavorites(data);
      }
    } catch (error) {
      console.error('Erro na conexão com Supabase:', error);
    }
  };

  const truncateName = (name, maxLength = 18) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name;
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.logo} />
              <Text style={styles.favoriteText}>{truncateName(item.razao_social)}</Text>
              <View style={styles.estrelas}>
                <Image source={require('../assets/star.png')} style={styles.starIcon} />
                <Text style={styles.notaText}>
                  {item.nota !== null ? item.nota.toFixed(1) : 'N/A'}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noFavorites}>Nenhum favorito adicionado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 10,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  favoriteText: {
    fontSize: 16,
    flex: 1,
  },
  estrelas: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  notaText: {
    fontSize: 16,
    color: '#555',
  },
  noFavorites: {
    fontSize: 18,
    color: 'gray',
  },
});

export default FavoritesScreen;
