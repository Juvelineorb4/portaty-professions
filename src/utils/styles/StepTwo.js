import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 40,
    position: 'relative',
    zIndex: 100,
  },
  container: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontFamily: 'thinItalic',
    fontSize: 20,
    marginBottom: 10,
  },
  textInputP: {
    fontFamily: 'regular',
    marginLeft: 10,
    color: '#fb8500',
  },
  textInput: {
    flex: 1,
    fontFamily: 'regular',
    marginLeft: 10,
    color: '#fb8500',
  },
  errorInput: {
    position: 'absolute',
    left: 0,
    bottom: 3,
    fontFamily: 'medium',
    color: 'red',
    fontSize: 12,
  },
  errorInputP: {
    position: 'absolute',
    left: 0,
    bottom: -5,
    fontFamily: 'medium',
    color: 'red',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#404040',
    padding: 11,
    borderRadius: 8,
    margin: 3,
  },
  inputContainerP: {
    flex: 1,
    width: '81%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#404040',
    padding: 11,
    borderRadius: 8,
    margin: 3,
    height: 55,
  },
  placeholder: {
    flex: 1,
    marginLeft: 10,
    color: '#8c9199cb',
    fontSize: 12,
    fontFamily: 'regular',
  },
  labelInput: {
    fontFamily: 'bold',
    fontSize: 14,
    color: '#404040',
  },
  textInputBot: {
    flex: 1,
    marginLeft: 10,
    color: '#fb8500',
    fontFamily: 'light',
  },
  inputContainerBot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 0,
    width: 150,
    padding: 11,
    borderRadius: 8,
    margin: 3,
  },
  placeholderBot: {
    flex: 1,
    marginLeft: 10,
    color: '#8c9199cb',
    fontSize: 11,
    fontFamily: 'light',
  },
  inputContainerDescription: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 0,
    padding: 11,
    borderRadius: 8,
    margin: 3,
  },
  placeholderDescription: {
    marginLeft: 10,
    color: '#8c9199cb',
    fontSize: 12,
    fontFamily: 'light',
    textAlign: 'justify',
  },
  textInputDescription: {
    width: '100%',
    padding: '0 10px',
    color: '#fb8500',
    fontFamily: 'light',
    textAlign: 'justify',
    fontSize: 12,
  },
  labelInputBot: {
    fontFamily: 'regular',
    fontSize: 14,
    color: '#404040',
  },
  modalMain: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    height: '100%',
  },
  modalBott: {
    marginTop: '22%',
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  modalTop: {
    flex: 1.3,
  },
  modalMid: {
    flex: 1.7,
  },
});

export default styles;
