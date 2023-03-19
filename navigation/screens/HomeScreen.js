import * as React from 'react'
import { View, Text, TouchableNativeFeedback} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import styles from '../Styles';

function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('S1')}
        >
          <Text>Go to Screen 1</Text>
        </TouchableNativeFeedback>
      </View>
    );
  }

const Stack = createStackNavigator();

function S1() {
  return (
      <View style={styles.container}>
      <Text>Screen 1</Text>
    </View>
  );
}

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="S1" component={S1} />
    </Stack.Navigator>
  );
}