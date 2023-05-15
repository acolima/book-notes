import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getTeste() {
    return this.httpClient.get<BooksDashboard>('http://localhost:5000');
  }
}

interface BooksDashboard {
  read: number;
  toRead: number;
  reading: number;
  have: number;
}
