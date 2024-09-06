import { StyleSheet } from 'react-native';

const stylesDashboard = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',  // Alterado para alinhar o conteúdo à esquerda
    width: '100%',
    marginVertical: 20,
  },
  inputArea: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center', // Alinha os itens verticalmente no centro
    justifyContent: 'space-between', // Ajusta a distribuição horizontalmente
    backgroundColor: '#1E1E1E',
    elevation: 1,
    height: 37,
    borderRadius: 20,
  },
  input: {
    fontFamily: 'Montserrat_500Medium',
    paddingHorizontal: 20,
    fontSize: 18,
    width: '92%',
    color: '#fff'
  },
  contentServ: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',  // Alinhar ao topo
    marginTop: 10,  // Espaçamento superior
  },
  servicos: {
    paddingHorizontal: 15,
    fontFamily: 'Monteserrat_700Bold',
    fontSize: 24,
    color: '#fff',
    width: '100%',  // Usar largura total
    textAlign: 'left',  // Alinhar o texto à esquerda
  },
  title: {
    marginTop: 20,
    paddingHorizontal: 15,
    fontFamily: 'Monteserrat_700Bold',
    fontSize: 20,
    color: 'black',
    width: '100%',
    textAlign: 'left',
    
  },
  horizontalScroll: {
    paddingHorizontal: 15,
    marginTop: 10,
    
  },
  commentsHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  commentsTitle: {
    marginTop: 20,
    paddingHorizontal: 15,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    
  },
  commentsScroll: {
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // Alinha os itens verticalmente no centro
    justifyContent: 'space-between'
  },
});

export default stylesDashboard;
