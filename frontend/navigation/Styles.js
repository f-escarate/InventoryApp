import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      textAlign: 'center',
      alignContent: 'center',
      margin: 10
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

    tableBorder: {
      borderWidth: 3,
      borderColor: 'black'
    },
    tableStyle: {
      flex: 0,
      margin: 10,
      alignContent: 'center',
      textAlign: 'center'
    },
    tableText: {
      textAlign: 'center'
    },
    subTable: {
      flex: 0,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignContent: 'center',
      margin: 10
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      margin: 5
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    textInput: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'black',
      fontSize: 15,
      margin: 5,
      backgroundColor: 'white',
      borderRadius: 10,
    },
    popUp: {
      flex: 0,
      backgroundColor: '#a31010',
      borderRadius: 10
    },
  });

export default styles;