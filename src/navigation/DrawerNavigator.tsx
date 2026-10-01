import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens/TabScreens/ProfileScreen';
import { DetailsScreen } from '../screens/TabScreens/DeteailsScreen';
import { AppTabNavigator } from './AppTabNavigator';
import { useProductStore } from '../store/useProductStore';
import { useEffect } from 'react';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    useEffect(() => { 
        fetchProducts(); 
    }, [fetchProducts]);
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={AppTabNavigator} options={
                        { 
                            drawerIcon: ({focused}) => (
                                <Image source={require('../../assets/Home.png')} style={
                                    {   width: 24, 
                                        height: 24, 
                                        opacity: focused ? 1 : 0.5,
                                    }} />
                            ) 
                        }}/>
            <Drawer.Screen name="MyOrders" component={DetailsScreen} options={
                        { 
                            drawerIcon: ({focused}) => (
                                <Image source={require('../../assets/MyOrders.png')} style={
                                    {   width: 24, 
                                        height: 24, 
                                        opacity: focused ? 1 : 0.5,
                                    }} />
                            ) 
                        }}/>
            <Drawer.Screen name="Settings" component={ProfileScreen} options={
                        { 
                            drawerIcon: ({focused}) => (
                                <Image source={require('../../assets/Profile.png')} style={
                                    {   width: 24, 
                                        height: 24, 
                                        opacity: focused ? 1 : 0.5,
                                    }} />
                            ) 
                        }}/>
        </Drawer.Navigator>
    );
};