import HomeScreen from './screens/HomeScreen'
import ScanScreen from './screens/ScanScreen';
import PantryScreen from './screens/PantryScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

// Screens Names

const homeName = 'Home';
const scanName = 'Scan';
const pantryName = 'Pantry';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
        <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={ ({route}) => ( {
            tabBarIcon: ( { focused, color, size } ) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                }
                else if (rn === scanName) {
                    iconName = focused ? 'camera' : 'camera-outline';
                }
                else if (rn === pantryName) {
                    iconName = focused ? 'archive' : 'archive-outline';
                }
                return <Ionicons name={iconName} size={size} color = {color}/>
            },

            "tabBarActiveTintColor": "tomato",
            "tabBarInactiveTintColor": "grey",
            "tabBarLabelStyle": {
                "paddingBottom": 10,
                "fontSize": 10
            },
            "tabBarStyle": [
                {
                "display": "flex"
                },
                null
            ]
            
        } ) } 
        >
            
        <Tab.Screen name={scanName} component={ScanScreen}/>
        <Tab.Screen name={homeName} component={HomeScreen}/>
        <Tab.Screen name={pantryName} component={PantryScreen}/>

        </Tab.Navigator>  
    </NavigationContainer>
  );
}


