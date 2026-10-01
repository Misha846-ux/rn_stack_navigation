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
import { IBook } from "../../models/BookEntity";
import { Dbinfrastructure } from "../../infrastructure/bdinfrastructure";

export const BookListScreen = () => {
  const [books, setBooks] = useState<Array<IBook>>([]);

  const loadBooks = async () => {
    const storedBooks = await Dbinfrastructure.getBooks();
    setBooks(storedBooks);
  };

  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, []),
  );

  const deleteBook = async (title: string) => {
    const updatedBooks = books.filter((book) => book.title !== title);
    await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  }

  const ClearAllBooks = async () => {
    await AsyncStorage.clear();
    setBooks([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список книг</Text>
      <Button title="Очистить список" onPress={ClearAllBooks} />
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>Автор: {item.author}</Text>
            <Button title="Удалить" onPress={async () => await deleteBook(item.title)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  bookItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  bookAuthor: { fontSize: 16, color: "gray" },
});
