import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 11,
    borderRadius: 8,
    margin: 3,
    borderColor: '#1f1f1f',
    borderWidth: 1,
    height: 55,
    marginBottom: 10
  },
  labelInput: {
    fontFamily: 'bold',
    fontSize: 14,
    color: '#1f1f1f',
  },
  textInput: {
    flex: 1,
    fontFamily: 'medium',
    marginLeft: 10,
    color: '#1f1f1f',
    height: 55,
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
    fontSize: 12,
    height: 55,
    fontFamily: 'medium',
  },
  security: {
    position: 'relative',
    right: 27,
  },
  continue: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    padding: 20,
    height: 60,
    backgroundColor: '#ffa424',
    borderRadius: 12,
    borderColor: '#1f1f1f',
    borderWidth: 1,
  },
  textContinue: {
    textAlign: 'center',
    fontFamily: 'bold',
    color: '#1f1f1f',
    fontSize: 18,
  },
  extras: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    borderColor: '#efeded',
    borderWidth: 1,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'regular',
    // margin: '15% 10px 10%',
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 32,
    color: '#1f1f1f',
  },
  enterCode: {
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: 'light',
    fontSize: 16,
    textAlign: 'center',
    color: '#404040',
    marginBottom: 40,
  },
  code: {
    fontFamily: 'light',
    fontSize: 16,
    textAlign: 'center',
    color: '#404040',
    // margin: '0px 0px 40px',
    marginBottom: 10
  },
  textRules: {
    fontFamily: 'regular',
    fontSize: 14,
    color: '#9d9d9d',
    margin: '0px 0px 40px',
  },
  emailText: {
    fontFamily: 'medium',
    color: '#1f1f1f',
  },
  timer: {
    fontFamily: 'medium',
    color: '#1f1f1f',
  },
});

export default styles;