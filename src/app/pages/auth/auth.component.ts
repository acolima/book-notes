import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {}

  @Output() userLogged = new EventEmitter();

  option: string = "login";
  loading: boolean = false;
  errorMessage: string = "";

  formLogin = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  formRegister = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ["", [Validators.required, Validators.minLength(6)]],
    iconUrl: ["", [Validators.required]],
  });

  ngOnInit(): void {
    const userLogged = localStorage.getItem("token");
    if (userLogged) {
      this.router.navigate(["/read"]);
    }
  }

  changeForm(option: string) {
    this.option = option;
    this.formRegister.reset();
    this.formLogin.reset();
    this.errorMessage = "";
  }

  handleLogin() {
    const username = this.formLogin.value.username!;
    const password = this.formLogin.value.password!;

    this.loading = true;
    this.authService.login({ username, password }).subscribe({
      next: (data) => {
        localStorage.setItem("auth", JSON.stringify(data));
        this.apiService.updateUserLogged();
        this.router.navigate(["/read"]);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error;
      },
    });
  }

  handleRegister() {
    const username = this.formRegister.value.username!;
    const password = this.formRegister.value.password!;
    const passwordConfirmation = this.formRegister.value.passwordConfirmation!;
    const iconUrl = this.formRegister.value.iconUrl!;

    if (password === passwordConfirmation) {
      this.loading = true;
      this.authService.register({ username, password, iconUrl }).subscribe({
        next: () => {
          this.loading = false;
          this.option = "login";
          this.formRegister.reset();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error;
        },
      });
    } else {
      this.errorMessage = "As senhas não coincidem";
    }
  }
}
