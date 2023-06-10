import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import Total from '../screens/Total'
import PhoneList2 from '../screens/DeviceList2/PhoneList2'

const Tab = createBottomTabNavigator()
const screenOptions = ({route}) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.normally,
    tabBarInactiveTintColor: colors.inactive,
    tabBarActiveBackgroundColor: colors.simply,
    tabBarInactiveBackgroundColor: colors.simply,
    tabBarIcon: ({focused, color, size}) => {
        let screenName = route.name
        let iconName = "star"
        if (screenName == "Total") {
            iconName = "cloud"
        }
        return <Icon name= {iconName}
            size={30}
            color={focused ? colors.normally : colors.inactive}></Icon>
    }
    
}
)

function UITab (props) {
    return <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name = "Branch 1" component={PhoneList2}></Tab.Screen>
        <Tab.Screen name = "Total" component={Total}></Tab.Screen>
        
        
    </Tab.Navigator>
} export default UITab