import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  content: {},
  panel: {
    marginTop: 10,
  },
  title: {
    fontFamily: 'medium',
    margin: '10% 10px 0%',
    textAlign: 'center',
    fontSize: 32,
    color: '#1f1f1f',
  },
  name: {
    fontFamily: 'light',
    margin: '0 10px 10%',
    textAlign: 'center',
    fontSize: 32,
    color: '#1f1f1f',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '11px 10px 11px 0px',
    borderRadius: 8,
    margin: '3px 0px 10px',
    borderWidth: 1,
    borderColor: '#1f1f1f',
    height: 55,
  },
  labelInput: {
    fontFamily: 'bold',
    fontSize: 14,
    color: '#1f1f1f',
  },
  textInput: {
    flex: 1,
    height: 55,
    fontFamily: 'regular',
    marginLeft: 14,
    color: '#1f1f1f',
  },
  errorInput: {
    fontFamily: 'bold',
    color: 'red',
    fontSize: 12,
    position: 'relative',
    top: -10,
  },
  errorInputMain: {
    fontFamily: 'bold',
    color: 'red',
    fontSize: 14,
    position: 'relative',
    top: -10,
  },
  placeholder: {
    flex: 1,
    marginLeft: 10,
    color: '#1f1f1f',
    fontSize: 14,
    fontFamily: 'regular',
  },
  login: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    height: 65,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f1f1f',
  },
  textLogin: {
    fontFamily: 'bold',
    fontSize: 18,
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  dont: {
    fontFamily: 'light',
    color: '#1f1f1f',
    fontSize: 15,
  },
  signupBtn: {
    fontFamily: 'bold',
    marginLeft: 5,
    color: '#1f1f1f',
    fontSize: 15,
  },
  forgot: {
    textAlign: 'center',
    fontFamily: 'bold',
    color: '#1f1f1f',
    fontSize: 15,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '5px 0 35px',
  },
  security: {
    position: 'relative',
    right: 27,
  },
});

export default styles;