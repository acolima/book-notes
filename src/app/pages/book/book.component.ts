import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book, BooksService } from "src/app/services/books.service";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit {
  book: Book = { id: "", title: "", author: [], pageCount: 0, have: false };
  coverWidth: number = 0;

  constructor(private booksService: BooksService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.coverWidth = window.innerWidth > 1400 ? 300 : 200;

    const id = this.route.snapshot.paramMap.get("id");
    this.booksService.getBookById(id!).subscribe({
      next: (data) => {
        this.book = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
