import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  contentHeader: {
    marginLeft: 20,
  },
  line: {
    width: '100%',
    height: 0.3,
    position: 'relative',
  },
  edit: {
    height: 35,
    width: 70,
    padding: 7,
    borderRadius: 8,
  },
  textEdit: {
    textAlign: 'center',
    fontFamily: 'regular',
    color: 'white',
    fontSize: 14,
  },
  register: {
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
    padding: 20,
    height: 60,
    backgroundColor: '#ffa424',
    borderRadius: 16,
  },
  textRegister: {
    textAlign: 'center',
    fontFamily: 'medium',
    color: 'white',
    fontSize: 15,
  },
});

export default styles;