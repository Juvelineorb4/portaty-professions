import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'relative',
  },
  columnGrid: {
    height: 110,
    width: '33%',
    marginBottom: '1%',
    borderRadius: 2,
  },
  columnList: {
    height: 60,
    paddingTop: 10,
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 10,
  },
  options: {
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 50,
    right: '0%',
    marginRight: -5,
    marginTop: 5,
  },
  modal: {
    backgroundColor: 'white',
    height: 65,
    width: 80,
    position: 'relative',
    right: 60,
    borderRadius: 4,
    padding: 5,
    marginTop: 7,
  },
  text: {
    fontSize: 13,
    fontFamily: 'lightItalic',
    padding: 5,
  },
  search: {
    marginTop: 20,
    textAlign: 'center',
    width: 250,
    padding: 20,
    height: 60,
    backgroundColor: '#ffa424',
    borderRadius: 16,
  },
  textSearch: {
    textAlign: 'center',
    fontFamily: 'medium',
    color: 'white',
    fontSize: 15,
  },
});

export default styles;
