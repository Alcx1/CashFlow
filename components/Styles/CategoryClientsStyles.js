import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 10,
  },
  clienteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clienteName: {
    fontSize: 18,
  },
  noResults: {
    fontSize: 18,
    color: 'gray',
  },
  // Adicione os outros estilos necessários aqui
});

export default styles;
