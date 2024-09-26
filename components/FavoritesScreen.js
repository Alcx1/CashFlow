import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Text style={styles.favoriteText}>{item}</Text>
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
  },
  favoriteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  favoriteText: {
    fontSize: 18,
  },
  noFavorites: {
    fontSize: 18,
    color: 'gray',
  },
});

export default FavoritesScreen;
