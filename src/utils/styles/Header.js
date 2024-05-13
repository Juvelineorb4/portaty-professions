import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  left: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
  },
  home: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  content: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: '#1f1f1f',
  },
  input: {
    fontFamily: 'regular',
    flex: 1,
    padding: 5,
  },
});

export default styles;