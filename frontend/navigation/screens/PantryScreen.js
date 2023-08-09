import * as React from 'react'
import { View, Text} from 'react-native'
import styles from '../Styles'
import { QueryTable } from './QueryTable'
import { AddProductPopUp } from './AddProductPopUp'

export default function PantryScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products</Text>
            <QueryTable query='/all'/>
            <AddProductPopUp/>
        </View>
    );
}