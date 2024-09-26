import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const stylesDashboard = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-center',  // Alterado para alinhar o conteúdo à esquerda
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  inputArea: {
    display: 'flex',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center', // Alinha os itens verticalmente no centro
    backgroundColor: '#0A3D52',
    elevation: 1,
    height: 37,
    borderRadius: 20,
    width: '100%',
  },
  input: {
    fontFamily: 'Montserrat_500Medium',
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1,
    color: '#fff',
    textAlign: 'left',
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
    justifyContent: 'space-between',

  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (width / 3) - 20,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  loginArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    color: '#1E1E1E',
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: '80%', // Limita o espaço para o e-mail em 80% da largura da tela
    flexShrink: 1, // Reduz o texto se necessário
    marginLeft:-80,
    marginTop: 14

  },
  usersaudacao: {
    color: '#1E1E1E',
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: '80%', // Limita o espaço para o e-mail em 80% da largura da tela
    flexShrink: 1, // Reduz o texto se necessário
    marginLeft:-53,
  },
  profileIcon: {
    position: 'absolute',
    left: 40,  // Ícone de perfil fica mais à esquerda
    top: 50,
  }, 
  destaquesContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  destaquesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  destaquesScroll: {
    flexDirection: 'row',

  },
  destaqueItem: {
    width: 250,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    left: 40,
    alignItems: 'center', 
    // Alinha o conteúdo à esquerda
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
    position: 'absolute', // Para permitir o alinhamento no canto
    top: 15, // Ajuste para o topo do item
    left: 10, // Ajuste para o canto esquerdo
  },
  destaqueLoja: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333llll',
    marginTop: 10, 
    flexDirection: 'row',
    left: 30,// Deixa espaço abaixo da logo
  },
  destaqueCategoria: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
    left: 20,
    top:5
  },
  estrelas: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginVertical: 10,
    marginRight: 220, // Controla a margem da esquerda
    textAlign: 'left', // Garante que o texto fique alinhado à esquerda
  },
  sectionTitle2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginVertical: 10,
    marginRight: 220, // Controla a margem da esquerda
    textAlign: 'left', // Garante que o texto fique alinhado à esquerda
  },
  settingsIcon: {
    marginLeft: 300,
  },
    arrow: {
      position: 'absolute',
      left: 10,
      top: '90%',
      zIndex: 1,
    },
});

export default stylesDashboard;
