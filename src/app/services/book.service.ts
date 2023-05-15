import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResults } from '../content/search-book/search-book.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  apiKey = environment.apiKey;

  searchBooks(bookName: string) {
    return this.httpClient.get<SearchResults>(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&key=${this.apiKey}&startIndex=0&maxResults=10`
    );
  }
}
