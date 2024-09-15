import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho da tela com o ícone de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Configurações</Text>
      </View>

      {/* Opções de Configurações */}
      <TouchableOpacity style={styles.option} onPress={() => alert('Política de Privacidade')}>
        <Feather name="lock" size={24} color="#1E1E1E" />
        <Text style={styles.optionText}>Política de privacidade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => alert('Ajuda')}>
        <Feather name="info" size={24} color="#1E1E1E" />
        <Text style={styles.optionText}>Ajuda</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SettingsScreen;
