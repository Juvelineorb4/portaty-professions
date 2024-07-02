import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 20,
    width: 160,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'medium',
    marginLeft: 10,
  },
  qrContent: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
