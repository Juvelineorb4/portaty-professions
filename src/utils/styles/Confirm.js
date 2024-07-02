import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    marginBottom: 20,
  },
  continue: {
    textAlign: 'center',
    width: '100%',
    padding: 20,
    height: 65,
    borderWidth: 1,
    borderColor: '#1f1f1f',
    borderRadius: 8,
    marginTop: -20,
  },
  textContinue: {
    textAlign: 'center',
    fontFamily: 'bold',
    color: '#1f1f1f',
    fontSize: 18,
  },
  textContainer: {
    marginTop: 30,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'regular',
    margin: '15% 10px 10%',
    textAlign: 'center',
    fontSize: 32,
  },
  titleAlert: {
    textAlign: 'center',
    fontFamily: 'regular',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 3,
  },
  subtitleAlert: {
    fontFamily: 'bold',
    textAlign: 'center',
    fontSize: 14,
    marginLeft: 5,
    color: '#1f1f1f',
    marginBottom: -20,
  },
});

export default styles;
