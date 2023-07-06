import { Component, OnInit } from "@angular/core";
import { BooksService, Categories } from "../services/books.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  books: Categories = { read: 0, toRead: 0, reading: 0, have: 0 };

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
