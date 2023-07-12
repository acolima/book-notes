import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { BooksService, Categories } from "../services/books.service";
import { getToken } from "src/utils";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  books: Categories = { read: 0, toRead: 0, reading: 0, have: 0 };

  @Input() logged = false;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["logged"].currentValue !== changes["logged"].previousValue && this.logged) {
      const token = getToken();

      this.booksService.getBooks(token).subscribe({
        next: (data) => {
          this.books = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
