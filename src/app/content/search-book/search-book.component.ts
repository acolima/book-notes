import { Component, OnInit } from "@angular/core";
import { Book } from "./book/book.component";
import { BookService } from "src/app/services/book.service";

export interface SearchResults {
  items: Book[];
  totalItems: number;
}

@Component({
  selector: "app-search-book",
  templateUrl: "./search-book.component.html",
  styleUrls: ["./search-book.component.scss"],
})
export class SearchBookComponent implements OnInit {
  constructor(private bookService: BookService) {}

  books: Book[] | undefined = [];
  bookName: string = "";
  noResults = false;
  loading = false;

  ngOnInit(): void {}

  search(e: any) {
    if (e.keyCode === 13) this.searchBook();
  }

  searchBook() {
    this.loading = true;
    this.books = [];
    this.bookService.searchBooks(this.bookName).subscribe({
      next: (data) => {
        this.books = data.items;
        this.noResults = data.totalItems === 0 ? true : false;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  clear() {
    this.bookName = "";
    this.books = [];
    this.noResults = false;
  }
}
