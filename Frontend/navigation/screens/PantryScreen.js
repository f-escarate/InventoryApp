import * as React from 'react'
import { View, Text} from 'react-native'
import styles from '../Styles'
import { QueryTable } from './QueryTable'

export default function PantryScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantry</Text>
            <QueryTable query='/all'/>
        </View>
    );
}