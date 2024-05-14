import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  line: {
    width: '150%',
    height: 0.5,
    position: 'relative',
    left: '-10%',
  },
  title: {
    fontFamily: 'thinItalic',
    fontSize: 20,
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
    padding: 20,
    width: 320,
    height: 450,
    borderColor: '#1f1f1f',
    borderWidth: 1,
  },
  modalTextSelect: {
    fontFamily: 'light',
    fontSize: 14,
    color: '#8c9199',
    textTransform: 'capitalize',
  },
  textInputTag: {
    flex: 1,
    color: '#8c9199cb',
    textTransform: 'capitalize',
    fontSize: 12,
    fontFamily: 'light',
  },
  inputContainerTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 20,
    borderRadius: 8,
    margin: 3,
  },
  labelInputTag: {
    fontFamily: 'regular',
    fontSize: 14,
    color: '#404040',
    textTransform: 'capitalize',
  },
  containerTag: {
    borderColor: 'rgb(209, 209, 209)',
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 10,
    margin: -6,
  },
  textTag: {
    fontSize: 12,
    fontFamily: 'thin',
  },
  textInput: {
    flex: 1,
    fontFamily: 'light',
    marginLeft: 10,
    color: '#8c9199cb',
    textTransform: 'capitalize',
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
    textTransform: 'capitalize',
    fontSize: 12,
    fontFamily: 'light',
  },
  labelInput: {
    fontFamily: 'regular',
    fontSize: 14,
    color: '#404040',
    textTransform: 'capitalize',
  },
  titleTag: {
    marginTop: -12,
    fontFamily: 'light',
    marginBottom: 12,
    fontSize: 12,
  },
});

export default styles;