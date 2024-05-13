import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20%',
  },
  input: {
    width: 45,
    height: 45,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontWeight: '100',
    marginBottom: 25,
    borderColor: '#fb8500',
    borderWidth: 1,
    fontFamily: 'light',
    fontSize: 18,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'thin',
    fontSize: 20,
    marginBottom: 3,
  },
  subtitle: {
    fontFamily: 'medium',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 5,
    color: '#fb8500',
  },
})

export default styles;