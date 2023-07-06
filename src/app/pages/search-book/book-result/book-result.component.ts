import { Component, Input, OnInit } from "@angular/core";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    pageCount?: number;
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

@Component({
  selector: "app-book-result",
  templateUrl: "./book-result.component.html",
  styleUrls: ["./book-result.component.scss"],
})
export class BookResultComponent implements OnInit {
  @Input() book: Book | undefined;

  title: string | undefined = "";
  thumbnail: string | undefined = "";
  authors: string[] | undefined = [];
  description: string | undefined = "";

  added: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.title = this.book?.volumeInfo.title;
    this.thumbnail = this.book?.volumeInfo.imageLinks?.thumbnail;
    this.authors = this.book?.volumeInfo.authors;
    this.description = this.book?.volumeInfo.description;
  }
}
