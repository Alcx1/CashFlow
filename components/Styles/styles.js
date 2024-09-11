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
  }, container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
  saudacao: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginTop: 120,
  },
  saudacao2: {
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  inputEmail: {
    marginTop: 15,
    width: '90%',
    height: 45,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  inputSenha: {
    marginTop: 10,
    width: '90%',
    height: 45,
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  textForgot: {
    marginTop: 30,
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonRegister: {
    marginTop: 15,
    backgroundColor: '#1E1E1E',
    width: '80%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
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
  },  googleButton: {
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

});

export default styles;