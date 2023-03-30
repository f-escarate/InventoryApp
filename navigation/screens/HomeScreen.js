import * as React from 'react'
import { useFetch } from "react-async"
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { Table, Row } from 'react-native-table-component';
import { createStackNavigator } from '@react-navigation/stack';

import styles from '../Styles';
import { NavigationContainer } from '@react-navigation/native';


var host = 'http://192.168.1.116:3000'

export default function HomeScreen({ navigation }) {
    return (
      <NavigationContainer independent={true}>
        <MyStack />
      </NavigationContainer>
    );
  }

const Stack = createStackNavigator();

function Menu({ navigation }) {
  return(
    <View style={styles.container}>
      <Text>
        Home Screen
        {'\n'}
        {'\n'}
      </Text>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate(' About to expire')}
      >
        <Text>Check products about to expire</Text>
      </TouchableNativeFeedback>
    </View>
  )
}

function AboutToExpire() {
  return (
      <View style={styles.container}>
      <Text>Products about to expire</Text>
      <QueryTable query='/aboutToExpire'/>
    </View>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" Menu" component={Menu} />
      <Stack.Screen name=" About to expire" component={AboutToExpire} />
    </Stack.Navigator>
  );
}

/*
  Gives a table requesting data from the API-REST made in Golang
*/
const QueryTable = ({ query }) => {
  const { data, error } = useFetch(`${host}${query}`, {
    headers: { accept: "application/json" },
  })
  if (error) return (<Text>{error.message}</Text>)
  if (data) {
  let theadData = Object.keys(data[0])
  return (
    <Table style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'column' }} borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}} >
      <Row data={theadData}/>
      {data.map((row, index) => {
        return (<Row data={[index, row.Name, row.ExpirationDate]}/>)
      })}
    </Table>
  );
  }
  return null
}