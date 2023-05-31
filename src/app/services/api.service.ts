import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  login(data: UserData) {
    return this.httpClient.post<Auth>(`${this.baseUrl}/auth/login`, data);
  }

  register(data: UserData) {
    return this.httpClient.post(`${this.baseUrl}/users/register`, data, {
      responseType: "text",
    });
  }
}

interface UserData {
  username: string;
  password: string;
}

interface Auth {
  username: string;
  token: string;
}
