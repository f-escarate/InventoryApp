import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      textAlign: 'center',
      alignContent: 'center'
    },
    title: {
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 10
    },

    text: {
      marginLeft: 2
    },
    tableBorder: {borderWidth: 3, borderColor: 'black'},
    tableStyle: { flex: 0, margin: 10 },
    subTable: {
      flex: 0,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignContent: 'center',
      margin: 10
    }
  });

export default styles;