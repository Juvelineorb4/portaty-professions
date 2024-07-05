import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  line: {
    width: '150%',
    height: 0.8,
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
    width: 300,
    height: 400,
    borderWidth: 1,
    borderColor: '#1f1f1f',
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
    borderRadius: 8,
    padding: 20,
    margin: 3,
  },
  labelInputTag: {
    fontFamily: 'regular',
    fontSize: 14,
    color: '#404040',
    textTransform: 'capitalize',
  },
  containerTag: {
    borderWidth: 0.5,
    borderColor: 'rgb(209, 209, 209)',
    borderRadius: 2,
    padding: 4,
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
    borderRadius: 8,
    padding: 11,
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
  line: {
    width: 300,
    height: 0.3,
    position: 'relative',
    left: '-7.7%',
    bottom: '10%',
  },
  modalContainerCountries: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalTopCountries: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTextCountries: {
    fontFamily: 'regular',
    fontSize: 14,
    marginLeft: 5,
  },
  modalContentCountries: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f1f1f',
    width: 220,
    height: 400,
  },
  modalTextSelectCountries: {
    fontFamily: 'light',
    fontSize: 14,
    color: '#8c9199',
  },
  search: {
    marginTop: 20,
    textAlign: 'center',
    width: 200,
    padding: 20,
    height: 60,
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: '#1f1f1f',
  },
  textSearch: {
    textAlign: 'center',
    fontFamily: 'bold',
    fontSize: 15,
  },
});

export default styles;
