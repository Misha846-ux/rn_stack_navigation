import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AppTabNavigator } from './src/navigation/AppTabNavigator';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';
import * as SQLite from 'expo-sqlite';
import BookAppDrawerNavigator from './src/navigation/BookAppDrawerNavigator';
import { useEffect } from 'react';
import { Dbinfrastructure } from './src/infrastructure/bdinfrastructure';

export default function App() {
  
  useEffect(() => {
    const initializeDatabase = async () => {
      await Dbinfrastructure.openDatabase();
      await Dbinfrastructure.createTables();
    };

    initializeDatabase();
  }, []);
  return (
    <NavigationContainer>
      <BookAppDrawerNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
