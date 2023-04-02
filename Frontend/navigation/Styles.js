import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginLeft: 2
    },
    tableBorder: {borderWidth: 1, borderColor: 'black'},
    tableStyle: { flex: 0, alignSelf: 'stretch', flexDirection: 'column', margin: 10 }
  });

export default styles;