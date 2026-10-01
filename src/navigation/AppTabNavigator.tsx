import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/TabScreens/HomeScreen';
import { DetailsScreen } from '../screens/TabScreens/DeteailsScreen';
import { ProfileScreen } from '../screens/TabScreens/ProfileScreen';
import { Image } from 'react-native';
import { AppNavigator } from './AppNavigator';

export type RootTabParamList = {
    Home: undefined;
    Profile: undefined;
    Details: { username: string };
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={AppNavigator} options={
            { 
                tabBarIcon: ({focused}) => (
                    <Image source={require('../../assets/Home.png')} style={
                        {   width: 24, 
                            height: 24, 
                            opacity: focused ? 1 : 0.5,
                        }} />
                ) 
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={
            { 
                tabBarIcon: ({focused}) => (
                    <Image source={require('../../assets/Profile.png')} style={
                        {   width: 24, 
                            height: 24, 
                            opacity: focused ? 1 : 0.5,
                        }} />
                ) 
            }}/>
            <Tab.Screen name="Details" component={DetailsScreen} options={
            { 
                tabBarIcon: ({focused}) => (
                    <Image source={require('../../assets/Details.png')} style={
                        {   width: 24, 
                            height: 24, 
                            opacity: focused ? 1 : 0.5,
                        }} />
                ) 
            }}/>
        </Tab.Navigator>
    )
}