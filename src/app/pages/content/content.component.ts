import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Book, BooksService } from "../../services/books.service";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit {
  @Input() page!: string;

  books: Book[] = [];

  have: boolean = false;

  bookDisplay: Book = {
    id: "",
    title: "",
    author: [],
    pageCount: 0,
    have: false,
  };

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.books = [];
    this.bookDisplay = { id: "", title: "", author: [], pageCount: 0, have: false };

    if (changes["page"].currentValue !== changes["page"].previousValue) {
      this.booksService.getBooksByCategory(this.page).subscribe((data) => {
        if (data.length !== 0) {
          this.books = data;
          this.bookDisplay = data[0];
          this.have = this.bookDisplay.have;
        }
      });
    }
  }

  changeBook(index: number) {
    this.bookDisplay = this.books[index];
  }

  toggleHave() {
    this.bookDisplay.have = !this.bookDisplay.have;
  }
}
