import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  showModal: boolean = false;
  logged: boolean = false;
  username: string | null = "";

  constructor() {}

  ngOnInit(): void {
    const username = localStorage.getItem("username");
    if (username) {
      this.username = username;
      this.logged = true;
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  userLogged() {
    this.logged = true;
    this.username = localStorage.getItem("username");
    this.showModal = false;
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    this.logged = false;
    location.reload();
  }
}
