import { Component } from "@angular/core";
import { ApiService } from "./services/api.service";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { getToken } from "src/utils";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  userLogged = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = getToken();

    if (token) {
      this.authService.validateToken(token).subscribe({
        next: () => {
          this.userLogged = true;
        },
        error: (error) => {
          console.error(error);
          localStorage.removeItem("auth");
          this.router.navigate(["/"]);
        },
      });
    } else {
      this.router.navigate(["/"]);
      this.apiService.getUserLogged().subscribe((data) => {
        this.userLogged = data;
      });
    }
  }
}
