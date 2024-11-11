import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
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
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    paddingHorizontal: 10,
  },
  clienteItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10,
    width: 350,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1, // Isso fará com que o conteúdo ocupe o espaço restante
    flexDirection: 'column',
  },
  clienteName: {
    fontSize: 16, // Aumentei um pouco para melhorar a legibilidade
    fontWeight: 'bold',
    color: '#333',
    left: -10
  },
  categoriaText: {
    fontSize: 14,
    color: '#666',
  },
  estrelasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notaText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
    top: -14,
    right: -8
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
  starIcon: {
    width: 14,
    height: 14,
    right: 8

  },
  sectionTitle2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginVertical: 10,
    marginRight: 220,
    textAlign: 'left',
  },
  destaqueCategoria:{
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    left: -150,
    top: 5
  },
  estrelas: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
