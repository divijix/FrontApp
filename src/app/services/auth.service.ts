import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'admin';
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);
  token = signal<string | null>(null);

  constructor() {
    this.loadCredentials();
  }

  private loadCredentials() {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        this.currentUser.set(JSON.parse(storedUser));
        this.token.set(storedToken);
      }
    } catch (e) {
      this.logout();
    }
  }

  login(user: User, token: string) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.currentUser.set(user);
    this.token.set(token);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.token.set(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null && this.token() !== null;
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  getToken(): string | null {
    return this.token();
  }
}
