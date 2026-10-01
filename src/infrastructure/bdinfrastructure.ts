import * as SQLite from 'expo-sqlite';
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { IBook } from '../models/BookEntity';
import { IAuthor } from '../models/AuthorEntity';

export class Dbinfrastructure {
    private static db: SQLite.SQLiteDatabase | null = null;

    static async openDatabase(): Promise<void> {
        try {
            if (this.db) return;
            this.db = await SQLite.openDatabaseAsync("books.db");
            console.log("База даних відкрита");
        } catch (error) {
            console.error("Помилка при відкритті бази даних:", error);
        }
    }

    static async createTables(): Promise<void> {
        if (!this.db) return;
        const table = "books";
        try {
        await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS ${table} (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            author TEXT NOT NULL
        );
        `);
        await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS authors (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
        );
        `);
        console.log("Таблиця books створена або вже існує");
        }
        catch (error) {
        console.error("Помилка при створенні таблиці books:", error);
        }
    }

    static async addBook(book: IBook): Promise<void> {
        if (!this.db) return;
        try {
            const id = uuidv4();
            await this.db.runAsync(
                `INSERT INTO books (id, title, author) VALUES (?, ?, ?);`,
                [id, book.title, book.author]
            );
            console.log("Книга додана до бази даних");
        }
        catch (error) {
            console.error("Помилка при додаванні книги до бази даних:", error);
        }
    }

    static async addAuthor(author: IAuthor): Promise<void> {
        if (!this.db) return;
        try {
            const id = uuidv4();
            await this.db.runAsync(
                `INSERT INTO authors (id, name) VALUES (?, ?);`,
                [id, author.name]
            );
            console.log("Автор доданий до бази даних");
        }
        catch (error) {
            console.error("Помилка при додаванні автора до бази даних:", error);
        }
    }

    static async getBooks(): Promise<IBook[]> {
        if (!this.db) return [];
        try {
            const result: IBook[] = await this.db.getAllAsync<IBook>(`SELECT * FROM books;`);
            return result;
        }
        catch (error) {
            console.error("Помилка при отриманні книг з бази даних:", error);
            return [];
        }
    }

    static async getAuthors(): Promise<IAuthor[]> {
        if (!this.db) return [];
        try {
            const result: IAuthor[] = await this.db.getAllAsync<IAuthor>(`SELECT * FROM authors;`);
            return result;
        }
        catch (error) {
            console.error("Помилка при отриманні авторів з бази даних:", error);
            return [];
        }
    }

    static async clearBooks(): Promise<void> {
        if (!this.db) return;
        try {
            await this.db.execAsync(`DELETE FROM books;`);
        }
        catch (error) {
            console.error("Помилка при очищенні бази даних:", error);
        }
    }

    static async deleteBookById(id: string): Promise<void> {
        if (!this.db) return;
        try {
            await this.db.runAsync(`DELETE FROM books WHERE id = ?;`, [id]);
        }
        catch (error) {
            console.error("Помилка при видаленні книги з бази даних:", error);
        }
    }
}