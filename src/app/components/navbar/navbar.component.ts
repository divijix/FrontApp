import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  menuOpen = false;
  showForm = false;
  submitting = false;

  applyForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    linkedin: ['', [Validators.required, Validators.pattern('^https?:\\/\\/(www\\.)?linkedin\\.com\\/.*$')]],
    college: ['', Validators.required],
    passout: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
  });

  openApplyModal() {
    this.showForm = true;
  }

  handleSubmit() {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.apiService.post('/api/applications', this.applyForm.value).subscribe({
      next: () => {
        alert("Application Submitted Successfully");
        this.applyForm.reset();
        this.showForm = false;
        this.submitting = false;
      },
      error: (err) => {
        alert(err.error?.error || "Failed to submit application");
        this.submitting = false;
      }
    });
  }
}
