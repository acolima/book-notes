import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DashboardService } from "../services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @Output() page = new EventEmitter<string>();

  books = {
    read: 0,
    toRead: 0,
    reading: 0,
    have: 0,
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getTeste().subscribe((t) => (this.books = t));
  }

  changePage(name: string) {
    this.page.emit(name);
  }
}
