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
    return this.httpClient.get<Categories>(`${this.baseUrl}/books/4`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  getBooksByCategory(category: string) {
    return this.httpClient.get<Categories>(`${this.baseUrl}/books/4/${category}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  getBooksIfHave() {
    return this.httpClient.get<Categories>(`${this.baseUrl}/books/4/have`, {
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

export interface Books {
  book: {
    id: string;
    title: string;
    author: string[];
    coverUrl?: string;
    description?: string;
    pageCount: number;
  };
  bookId: string;
  category: string;
  have: boolean;
  modifyAt: Date;
  userId: number;
}
