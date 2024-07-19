import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontFamily: 'light',
    marginLeft: 9,
    color: '#8c9199cb',
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
    borderWidth: 1,
    borderColor: '#1f1f1f',
    backgroundColor: '#ffb703',
  },
  modalText: {
    fontFamily: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  modalTextSelect: {
    fontFamily: 'light',
    fontSize: 14,
    color: '#8c9199',
  },
  textInputTag: {
    flex: 1,
    color: '#1f1f1f',
    fontSize: 13,
    fontFamily: 'medium',
  },
  textInputTagError: {
    flex: 1,
    color: 'red',
    fontSize: 13,
    fontFamily: 'medium',
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
  },
  containerTag: {
    borderWidth: 0.5,
    borderColor: 'rgb(209, 209, 209)',
    borderRadius: 2,
    padding: 2,
    margin: -6,
  },
  textTag: {
    fontSize: 12,
    fontFamily: 'medium',
  },
  textInput: {
    flex: 1,
    fontFamily: 'light',
    marginLeft: 10,
    color: '#8c9199cb',
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
});

export default styles;
