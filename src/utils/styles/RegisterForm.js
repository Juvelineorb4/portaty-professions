import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  title: {
    fontFamily: 'thinItalic',
    fontSize: 20,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: 'light',
    marginLeft: 10,
    color: '#fb8500',
  },
  errorInput: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 11,
    borderRadius: 8,
    margin: 3,
  },
  placeholder: {
    flex: 1,
    marginLeft: 10,
    color: '#8c9199cb',
    fontSize: 12,
    fontFamily: 'light',
  },
  labelInput: {
    fontFamily: 'regular',
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
    padding: 11,
    borderRadius: 8,
    margin: 3,
    width: 150,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalText: {
    fontFamily: 'regular',
    fontSize: 14,
    marginLeft: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: 220,
    height: 400,
  },
  modalTextSelect: {
    fontFamily: 'light',
    fontSize: 14,
    color: '#8c9199',
  },
});

export default styles;
