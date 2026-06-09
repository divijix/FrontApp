import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ApiService } from '../../services/api.service';

interface ContactInfo {
  iconClass: string;
  title: string;
  value: string;
  subtitle: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  contactInfo: ContactInfo[] = [
    {
      iconClass: 'fa-brands fa-whatsapp',
      title: 'WhatsApp',
      value: '8009799550',
      subtitle: 'Instant messaging'
    },
    {
      iconClass: 'fa-solid fa-envelope',
      title: 'Email',
      value: 'divijixtechnology@zohomail.in',
      subtitle: 'Response within 24hrs'
    },
    {
      iconClass: 'fa-brands fa-instagram',
      title: 'Instagram',
      value: '@kingu_ai',
      subtitle: 'Follow us for updates'
    }
  ];

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  loading = false;
  status = { type: '', message: '' };

  handleSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.status = { type: '', message: '' };

    this.apiService.post('/api/contact', this.contactForm.value).subscribe({
      next: () => {
        this.status = { type: 'success', message: 'Message sent successfully!' };
        this.contactForm.reset();
        this.loading = false;
      },
      error: (err) => {
        this.status = { type: 'error', message: err.error?.error || "Failed to submit message" };
        this.loading = false;
      }
    });
  }
}
