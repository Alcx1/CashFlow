import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = ({ navigation }) => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleAcceptPrivacy = () => {
    Alert.alert(
      "Política de Privacidade",
      "Ao aceitar, você concorda com a coleta e uso dos dados conforme descrito nesta política.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Aceitar",
          onPress: () => setAcceptedPrivacy(true)
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Configurações</Text>
      </View>

      {/* Botão para exibir a política de privacidade */}
      <TouchableOpacity style={styles.option} onPress={() => setShowPrivacyPolicy(true)}>
        <Feather name="lock" size={24} color="#1E1E1E" />
        <Text style={styles.optionText}>Política de privacidade</Text>
      </TouchableOpacity>

      {/* Mensagem de consentimento ou aceitação */}
      {acceptedPrivacy ? (
        <Text style={styles.consentText}>Você aceitou nossa Política de Privacidade.</Text>
      ) : (
        <Text style={styles.consentText}>É necessário aceitar a Política de Privacidade para continuar.</Text>
      )}

      {/* Exibe a política de privacidade após o clique */}
      {showPrivacyPolicy && (
        <ScrollView contentContainerStyle={styles.privacyTextContainer}>
          <Text style={styles.privacyTitle}>Política de Privacidade</Text>
          <Text style={styles.privacyText}>
            1. **Dados Coletados**: Coletamos informações pessoais como nome, e-mail e localização para melhorar sua experiência.
          </Text>
          <Text style={styles.privacyText}>
            2. **Uso dos Dados**: Usamos seus dados para personalizar o conteúdo, melhorar o aplicativo e garantir a segurança.
          </Text>
          <Text style={styles.privacyText}>
            3. **Compartilhamento de Dados**: Não compartilhamos suas informações com terceiros, exceto quando exigido por lei.
          </Text>
          <Text style={styles.privacyText}>
            4. **Direitos do Usuário**: Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento.
          </Text>

          {/* Botão para aceitar a política */}
          <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptPrivacy}>
            <Text style={styles.acceptButtonText}>Aceitar Política de Privacidade</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
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
  consentText: {
    fontSize: 14,
    marginTop: 10,
    color: '#888',
  },
  privacyTextContainer: {
    paddingVertical: 20,
  },
  privacyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  privacyText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  acceptButton: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen;
