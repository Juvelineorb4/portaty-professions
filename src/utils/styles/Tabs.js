import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 60,
    paddingTop: 3,
    alignSelf: 'center',
    borderWidth: 0.7,
    borderColor: '#1f1f1f',
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  slidingTab: {
    width: 50,
    height: 50,
    borderRadius: 30,
    bottom: 19,
    borderWidth: 0.7,
    borderColor: '#1f1f1f',
  },
});

export default styles;