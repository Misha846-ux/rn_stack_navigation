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
import { Dbinfrastructure } from "../../infrastructure/bdinfrastructure";

export const AddAuthorScreen = () => {
    const [author, setAuthor] = useState("");
    const handelSaveAuthor = async () => {
        await Dbinfrastructure.addAuthor({ name: author });
        setAuthor("");
    }
    return (
        <View>
            <TextInput
                placeholder="Введите имя автора"
                value={author}
                onChangeText={setAuthor}
            />
            <Button
                title="Сохранить автора"
                onPress={handelSaveAuthor}
            />
        </View>
    )
}