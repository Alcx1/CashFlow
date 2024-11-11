import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  saudacao: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  saudacao2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
   container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection : 'column'
    
  },
  saudacao: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#0A3D52',
    marginTop: 120,
  },
  saudacao2: {
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A3D52',
  },
  inputEmail: {
    marginTop: 15,
    width: '80%',
    height: 45,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#0D506C',
    top: 120
  },
  inputSenha: {
    marginTop: 10,
    width: '80%',
    height: 45,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    top: 40
  },
  textForgot: {
    marginTop: 20,
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 15,
    top: 10
  },
  buttonLogin: {
    marginTop: 10,
    backgroundColor: '#0D506C',
    width: '70%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    top: 10
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    padding: 10,
    zIndex: 1, // Garante que a seta fique acima de outros elementos
  }, googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rememberMeContainer:{
  flexDirection: 'row',
  top: 25,
  padding:5,
  },
  rememberMeText:{
    fontWeight: 'bold',
    flexDirection: 'row',
    padding: 10
  },
  logo: {
    width: 230, // Ajuste para o tamanho desejado
    height: 230,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: 40

  },
  logo1:{
    width: 53,
    height: 53,
    borderRadius: 10,
    marginBottom: 10,
    position: 'absolute', // Para permitir o alinhamento no canto
    top: 60,
    right: -30 // Ajuste para o topo do item // Ajuste para o canto esquerdo
  },
  backgroundLogo: {
    position: 'absolute',
    width: '100%',
    height: '35%',
    opacity: 10, // Ajuste a opacidade para o efeito desejado
  },
    inputEmailLogin: {
    marginTop: 15,
    width: '80%',
    height: 45,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#0D506C',
    top: 50
    },
    buttonEnter: {
      marginTop: 10,
      backgroundColor: '#0D506C',
      width: '70%',
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 18,
      top: 108
    },
    textForgotEnter: {
      marginTop: 20,
      color: '#1E1E1E',
      fontWeight: 'bold',
      fontSize: 15,

    },
    clique:{
      top: 100
    },
    backgroundLogo2: {
      position: 'absolute',
      width: '100%',
      height: '34%',
      opacity: 10
    }
});

export default styles;