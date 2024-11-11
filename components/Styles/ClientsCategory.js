import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


const ClientsCategory = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    padding:4,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 18,
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
    color: '#333',
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
    borderRadius: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  starIcon: {
    width: 14,
    height: 14,
    left:-6,
    top:0
  },
});

export default ClientsCategory;
