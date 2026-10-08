import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { BookListScreen } from "../screens/BooksScreen/BookListScreen";
import { AddBookScreen } from "../screens/BooksScreen/AddBookScreen";
import { AddAuthorScreen } from "../screens/BooksScreen/AddAuthorScreen";

const Drawer = createDrawerNavigator();

export default function BookAppDrawerNavigator() {
  return (
      <Drawer.Navigator initialRouteName="Список книг">
        <Drawer.Screen name="Список книг" component={BookListScreen} />
        <Drawer.Screen name="Добавить книгу" component={AddBookScreen} />
        <Drawer.Screen name="Добавить автора" component={AddAuthorScreen} />
      </Drawer.Navigator>
  );
}

