import * as React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import { QueryTable } from './QueryTable'
import styles from '../Styles';


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

      <TouchableNativeFeedback 
        onPress={() => navigation.navigate(' Out of stock')}
      >
        <View><OutOfStock anStyle = {styles.subTable}/></View>
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

function OutOfStock({anStyle = styles.container}) {
  return (
    <View style={anStyle}>
      <Text style={styles.title}>Products out of stock</Text>
      <QueryTable query='/outOfStock'/>
    </View>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" Menu" component={Menu} />
      <Stack.Screen name=" About to expire" component={AboutToExpire} />
      <Stack.Screen name=" Out of stock" component={OutOfStock} />
    </Stack.Navigator>
  );
}
