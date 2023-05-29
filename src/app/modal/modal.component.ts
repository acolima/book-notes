import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  constructor(private fb: FormBuilder, private apiService: ApiService) {}

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
  }

  handleSubmit() {
    if (this.option === "login") this.handleLogin();
  }

  handleLogin() {
    this.loading = true;
    this.apiService
      .login({
        username: this.userForm.value.username!,
        password: this.userForm.value.password!,
      })
      .subscribe({
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
}
