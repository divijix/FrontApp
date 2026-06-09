import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

interface AuthResponse {
  token: string;
  user: any;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  isLogin = true;
  loginForm: FormGroup = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  error = '';
  loading = false;

  goHome() {
    this.router.navigate(['/']);
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
    const nameControl = this.loginForm.get('name');
    if (this.isLogin) {
      nameControl?.clearValidators();
    } else {
      nameControl?.setValidators([Validators.required]);
    }
    nameControl?.updateValueAndValidity();
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.error = '';
    this.loading = true;

    const endpoint = this.isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = { ...this.loginForm.value };
    if (this.isLogin) {
      delete payload.name;
    }

    this.apiService.post<AuthResponse>(endpoint, payload).subscribe({
      next: (data) => {
        this.authService.login(data.user, data.token);
        alert(this.isLogin ? "Login Successful" : "Account Created Successfully");
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || "Authentication failed";
        this.loading = false;
      }
    });
  }
}
