import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Book, BooksService } from "../../services/books.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit {
  page: string = "";
  coverWidth: number = 0;

  books: Book[] = [];

  bookDisplay: Book = {
    id: "",
    title: "",
    author: [],
    pageCount: 0,
    have: false,
  };

  constructor(private booksService: BooksService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.page = this.route.snapshot.url[0].path;
    this.coverWidth = window.innerWidth > 1400 ? 300 : 200;

    this.booksService.getBooksByCategory(this.page).subscribe((data) => {
      if (data.length !== 0) {
        this.books = data;
        this.bookDisplay = data[0];
        console.log(data);
      }
    });
  }

  changeBook(index: number) {
    this.bookDisplay = this.books[index];
  }
}
