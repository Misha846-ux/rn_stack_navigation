import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { AppNavigator } from './AppNavigator';
import ShopFavoritesScreen from '../screens/ShopFavoritesScreen';
import { NoScreen } from "../screens/NoScreen";

export type RootTabParamList = {
    Home: undefined;
    Search: undefined;
    Bag: undefined;
    Profile: undefined;
    Favorites: undefined;
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
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
            <Tab.Screen
                name="Search"
                component={NoScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="search-outline"
                            size={size}
                            color={color}
                            style={{ opacity: focused ? 1 : 0.5 }}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Favorites" component={ShopFavoritesScreen} options={
            {
                tabBarIcon: ({focused}) => (
                    <Image source={require('../../assets/Favorites.png')} style={
                        {   width: 24,
                            height: 24,
                            opacity: focused ? 1 : 0.5,
                        }} />
                )
            }}/>
            <Tab.Screen
                name="Bag"
                component={NoScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="bag-outline"
                            size={size}
                            color={color}
                            style={{ opacity: focused ? 1 : 0.5 }}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={NoScreen} options={
            { 
                tabBarIcon: ({focused}) => (
                    <Image source={require('../../assets/Profile.png')} style={
                        {   width: 24, 
                            height: 24, 
                            opacity: focused ? 1 : 0.5,
                        }} />
                ) 
            }}/>
        </Tab.Navigator>
    )
}