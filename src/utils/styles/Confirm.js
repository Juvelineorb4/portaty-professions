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
    // flex: 1,
    textAlign: "center",
    width: "100%",
    alignItems: "center",
    padding: 20,
    height: 65,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f1f1f",
    marginTop: -20
  },
  textContinue: {
    fontFamily: "bold",
    fontSize: 16,
  },
  textContainer: {
    marginTop: 30,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'regular',
    marginHorizontal: 10,
    marginTop: '15%',
    marginBottom: '10%',
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
