import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Input() showModal = false;

  option: string = "register";

  userForm = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ["", [Validators.required, Validators.minLength(6)]],
  });

  controls = this.userForm.controls;

  ngOnInit(): void {}

  changeModalView(option: string) {
    this.option = option;
    this.userForm.reset();
  }
}
