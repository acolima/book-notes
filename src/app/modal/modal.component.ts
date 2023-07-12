import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  @Input() showModal = false;
  @Output() userLogged = new EventEmitter();

  option: string = "login";
  loading: boolean = false;
  errorMessage: string = "";

  userForm = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ["", [Validators.minLength(6)]],
  });

  ngOnInit(): void {}

  changeModalView(option: string) {
    this.option = option;
    this.userForm.reset();
    this.errorMessage = "";
  }

  handleSubmit() {
    const username = this.userForm.value.username!;
    const password = this.userForm.value.password!;
    const passwordConfirmation = this.userForm.value.passwordConfirmation!;

    this.errorMessage = "";

    if (this.option === "login") {
      this.handleLogin(username, password);
    } else {
      this.handleRegister(username, password, passwordConfirmation);
    }
  }

  handleLogin(username: string, password: string) {
    this.loading = true;
    this.authService.login({ username, password }).subscribe({
      next: (data) => {
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.token);

        this.userLogged.emit();

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error;
      },
    });
  }

  handleRegister(username: string, password: string, passwordConfirmation: string) {
    if (password === passwordConfirmation) {
      this.loading = true;
      this.authService.register({ username, password }).subscribe({
        next: () => {
          this.loading = false;
          this.option = "login";
          this.userForm.reset();
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
