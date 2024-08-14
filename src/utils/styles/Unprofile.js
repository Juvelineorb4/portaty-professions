import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: '#1f1f1f',
    borderRadius: 500,
  },
  edit: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    position: 'relative',
    top: -30,
    marginBottom: -25,
  },
  user: {
    margin: 10,
    fontSize: 17,
    fontFamily: 'light',
    textAlign: 'center',
  },
  line: {
    width: '150%',
    height: 0.5,
  },
  containerSelect: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    padding: 20,
    fontFamily: 'light',
    fontSize: 24,
    marginBottom: 10,
  },
  iconLeft: {
    height: 58,
    width: 58,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 0.7,
    borderColor: '#1f1f1f',
  },
  textContainerSelect: {
    width: '68%',
  },
  textTitleSelect: {
    fontFamily: 'medium',
    fontSize: 15,
  },
  textSubtitleSelect: {
    fontFamily: 'light',
    fontSize: 12,
  },
  titleSettings: {
    fontFamily: 'lightItalic',
    padding: 20,
    fontSize: 20,
    marginBottom: 10,
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
    width: '100%',
  },
  modalTextSelect: {
    fontFamily: 'light',
    fontSize: 14,
    color: '#8c9199',
    textTransform: 'capitalize',
  },
});

export default styles;