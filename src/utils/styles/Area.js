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
    paddingVertical: 100,
    paddingHorizontal: 20,
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
    borderRadius: 10,
    padding: 20,
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
    color: '#8c9199cb',
    fontSize: 12,
    fontFamily: 'regular',
  },
  inputContainerTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: '18px 10px',
    borderRadius: 8,
    margin: '3px 0px 10px',
    borderWidth: 1,
    borderColor: 'black',
  },
  labelInputTag: {
    fontFamily: 'bold',
    fontSize: 14,
    color: '#404040',
  },
  containerTag: {
    borderWidth: 1.5,
    borderColor: '#ffb703',
    borderRadius: 4,
    padding: '4px 10px',
    margin: '-6px 2px',
  },
  textTag: {
    fontSize: 12,
    fontFamily: 'medium',
    textTransform: 'capitalize',
  },
  textInput: {
    flex: 1,
    fontFamily: 'regular',
    marginLeft: 10,
    color: '#8c9199cb',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: '11px 10px 11px 0px',
    borderRadius: 8,
    margin: '3px 0px 10px',
  },
  placeholder: {
    flex: 1,
    marginLeft: 10,
    color: '#8c9199cb',
    fontSize: 12,
    fontFamily: 'regular',
  },
  labelInput: {
    fontFamily: 'regular',
    fontSize: 14,
    color: '#404040',
  },
  titleTag: {
    marginLeft: 5,
    fontFamily: 'bold',
    fontSize: 14,
  },
  line: {
    width: 300,
    height: 0.3,
    position: 'relative',
    left: '-7.7%',
    bottom: '10%',
  },
});

export default styles;
