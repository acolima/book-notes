import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;
  token = localStorage.getItem("token");

  getBooks() {
    return this.httpClient.get<Categories>(`${this.baseUrl}/books/dashboard`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  getBooksByCategory(category: string) {
    return this.httpClient.get<Book[]>(`${this.baseUrl}/books/category/${category}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  getBookById(id: string) {
    return this.httpClient.get<Book>(`${this.baseUrl}/books/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}

export interface Categories {
  read: number;
  toRead: number;
  reading: number;
  have: number;
}

export interface Book {
  id: string;
  title: string;
  author: string[];
  coverUrl?: string;
  description?: string;
  pageCount: number;
  have: boolean;
}
