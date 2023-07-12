import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor() {}

  private logged$ = new Subject<boolean>();

  updateUserLogged() {
    this.logged$.next(true);
  }

  getUserLogged() {
    return this.logged$;
  }
}
