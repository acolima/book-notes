import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  page = "read";

  changePageName(name: string) {
    this.page = name;
  }
}
