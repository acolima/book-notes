import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Book } from "../pages/search-book/book-result/book-result.component";

export interface SearchResults {
  items: Book[];
  totalItems: number;
}

@Injectable({
  providedIn: "root",
})
export class GoogleApiService {
  constructor(private httpClient: HttpClient) {}

  apiKey = environment.apiKey;

  searchBooks(bookName: string) {
    return this.httpClient.get<SearchResults>(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&key=${this.apiKey}&maxResults=15`
    );
  }
}
