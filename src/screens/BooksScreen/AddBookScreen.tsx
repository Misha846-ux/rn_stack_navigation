import { useState, useCallback } from "react";
import {
  Pressable,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Dbinfrastructure } from "../../infrastructure/bdinfrastructure";
import { IBook } from "../../models/BookEntity";
import { IAuthor } from "../../models/AuthorEntity";


export const AddBookScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [isAuthorListVisible, setIsAuthorListVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadAuthors = async () => {
        try {
          const storedAuthors = await Dbinfrastructure.getAuthors();
          setAuthors(storedAuthors);
        } catch (error) {
          console.error("Ошибка при загрузке авторов", error);
        }
      };

      loadAuthors();
    }, []),
  );

  const saveBook = async () => {
    if (!title || !author) {
      Alert.alert("Ошибка", "Введите название и автора книги");
      return;
    }

    try {
      Dbinfrastructure.addBook({ title, author });
      setTitle("");
      setAuthor("");
      Alert.alert("Успех", "Книга добавлена!");
      navigation.navigate("Список книг");
    } catch (error) {
      console.error("Ошибка при сохранении книги", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить книгу</Text>
      <TextInput
        style={styles.input}
        placeholder="Название книги"
        value={title}
        onChangeText={setTitle}
      />
      <Pressable
        style={styles.input}
        onPress={() => setIsAuthorListVisible(!isAuthorListVisible)}
      >
        <Text style={author ? styles.selectedAuthor : styles.authorPlaceholder}>
          {author || "Выберите автора"}
        </Text>
      </Pressable>
      {isAuthorListVisible && (
        <View style={styles.authorList}>
          {authors.length > 0 ? (
            authors.map((item) => (
              <Pressable
                key={item.id}
                style={styles.authorOption}
                onPress={() => {
                  setAuthor(item.name);
                  setIsAuthorListVisible(false);
                }}
              >
                <Text style={styles.selectedAuthor}>{item.name}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.emptyAuthors}>Список авторов пуст</Text>
          )}
        </View>
      )}
      <Button title="Сохранить" onPress={saveBook} />
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
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  authorList: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: -10,
    marginBottom: 10,
  },
  authorOption: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedAuthor: {
    color: "#222",
  },
  authorPlaceholder: {
    color: "#888",
  },
  emptyAuthors: {
    padding: 10,
    color: "#888",
  },
  bookItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  bookTitle: { fontSize: 18, fontWeight: "bold" },
  bookAuthor: { fontSize: 16, color: "gray" },
});
