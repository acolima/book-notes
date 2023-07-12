import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
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

  validateToken(token: string | null) {
    return this.httpClient.get(`${this.baseUrl}/auth/token`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "text",
    });
  }
}

interface UserData {
  username: string;
  password: string;
  iconUrl?: string;
}

interface Auth {
  username: string;
  token: string;
}
