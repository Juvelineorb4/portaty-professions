import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    column: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
        width: '33%',
        marginBottom: '1%',
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#5E2129',
    },
});

export default styles;
