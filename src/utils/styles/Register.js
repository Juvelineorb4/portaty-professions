import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'bold',
    margin: '15% 10px 0%',
    textAlign: 'center',
    fontSize: 36,
    color: '#ffb703',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0px 10px 11px 0px',
    borderRadius: 8,
    margin: 3,
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
    fontFamily: 'regular',
    width: '100%',
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
  placeholder: {
    width: '100%',
    marginLeft: 10,
    color: '#1f1f1f',
    fontSize: 12,
    fontFamily: 'light',
    height: 55,
  },
  placeholderGender: {
    marginLeft: 10,
    color: '#1f1f1f',
    fontSize: 12,
    fontFamily: 'regular',
    height: 55,
    width: '100%',
  },
  security: {
    position: 'relative',
    right: 27,
  },
  continue: {
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
  textContinue: {
    fontFamily: 'bold',
    fontSize: 16,
  },
});

export default styles;
