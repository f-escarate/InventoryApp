import * as React from 'react'
import { useFetch } from "react-async"
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
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
      <Tables navigation={navigation} />
    </View>
  )
}

function Tables({ navigation }){
  return (
    <View>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate(' About to expire')}
      >
        <View><AboutToExpire anStyle = {styles.subTable}/></View>
      </TouchableNativeFeedback>

    </View>
  )
}

function AboutToExpire({anStyle = styles.container}) {
  return (
    <View style={anStyle}>
      <Text style={styles.title}>Products about to expire</Text>
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

  const theadData = Object.keys(data[0])
  const tBodyData = data.map((row, index) => {
    let date = new Date(row.ExpirationDate)
    return [index, row.Name, date.toISOString().split('T')[0]]
  })

  return (
    <Table style={styles.tableStyle} borderStyle={styles.tableBorder} >
      <Row key={"head"} data={theadData}/>
      <Rows data={tBodyData} />
    </Table>
  );
  }
  return null
}