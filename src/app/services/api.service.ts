import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getBaseUrl(): string {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Dev mode: point to local server port 5000 if needed, or proxy config
      // Let's match the original config.js logic:
      return 'http://localhost:5000';
    }
    return 'https://internshipapp-xi.vercel.app';
  }

  private getHeaders(authRequired: boolean): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (authRequired) {
      const token = this.authService.getToken();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  get<T>(path: string, authRequired = false): Observable<T> {
    const url = `${this.getBaseUrl()}${path}`;
    return this.http.get<T>(url, { headers: this.getHeaders(authRequired) });
  }

  post<T>(path: string, body: any, authRequired = false): Observable<T> {
    const url = `${this.getBaseUrl()}${path}`;
    return this.http.post<T>(url, body, { headers: this.getHeaders(authRequired) });
  }

  put<T>(path: string, body: any, authRequired = false): Observable<T> {
    const url = `${this.getBaseUrl()}${path}`;
    return this.http.put<T>(url, body, { headers: this.getHeaders(authRequired) });
  }

  delete<T>(path: string, authRequired = false): Observable<T> {
    const url = `${this.getBaseUrl()}${path}`;
    return this.http.delete<T>(url, { headers: this.getHeaders(authRequired) });
  }
}
