import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  welcomeText2: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#B3B3B3',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 14,
    paddingLeft: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#1C1C1C',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#B3B3B3',
  },
  buttonEnter: {
    marginTop: 10,
    backgroundColor: '#2E8B57',
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  textButton: {
    color: '#1C1C1C',
    fontWeight: 'bold',
    fontSize: 18,
  },
  clique: {
    marginTop: 20,
  },
  textForgotEnter: {
    color: '#B3B3B3',
    fontWeight: 'bold',
    fontSize: 15,
  },
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonForgot: {
    color: '#B3B3B3',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',  // Alinha o texto à direita
    alignSelf: 'flex-end',  // Posiciona o texto à direita dentro do contêiner pai
    marginRight: 8,  // Ajuste conforme necessário para espaçamento
    marginTop: -10
  },
  rememberMeText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  
});

export default styles;
