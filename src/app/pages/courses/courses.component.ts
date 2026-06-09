import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  is_technical: boolean;
  icon_name: string;
  image_url?: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  courses: Course[] = [];
  coursesLoading = true;
  coursesError = '';

  selectedLevel = 'All';
  searchTerm = '';
  levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  inquiryForm = {
    name: '',
    phone: '',
    email: '',
    course: 'Select a course',
    message: ''
  };
  inquiryLoading = false;
  inquiryStatus = { type: '', message: '' };

  ngOnInit() {
    this.apiService.get<Course[]>('/api/courses').subscribe({
      next: (data) => {
        this.courses = data;
        this.coursesLoading = false;
      },
      error: (err) => {
        this.coursesError = err.error?.error || 'Failed to load courses';
        this.coursesLoading = false;
      }
    });
  }

  getFoundationCourses(): Course[] {
    return this.courses.filter((c) => !c.is_technical);
  }

  getFilteredTechnicalCourses(): Course[] {
    const technical = this.courses.filter((c) => c.is_technical);
    return technical.filter((c) => {
      const matchesLevel = this.selectedLevel === 'All' || c.level === this.selectedLevel;
      const matchesSearch = c.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesLevel && matchesSearch;
    });
  }

  handleEnroll(courseId: number) {
    if (!this.authService.isLoggedIn()) {
      alert('Please log in to enroll in courses.');
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.post<any>('/api/courses/enroll', { courseId }).subscribe({
      next: () => {
        alert('Enrollment successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to enroll in course');
      }
    });
  }

  handleInquirySubmit() {
    if (this.inquiryForm.course === 'Select a course') {
      this.inquiryStatus = { type: 'error', message: 'Please select a course of interest.' };
      return;
    }
    this.inquiryLoading = true;
    this.inquiryStatus = { type: '', message: '' };

    this.apiService.post<any>('/api/inquiries', this.inquiryForm).subscribe({
      next: () => {
        this.inquiryStatus = { type: 'success', message: 'Your inquiry has been submitted successfully!' };
        this.inquiryForm = {
          name: '',
          phone: '',
          email: '',
          course: 'Select a course',
          message: ''
        };
        this.inquiryLoading = false;
      },
      error: (err) => {
        this.inquiryStatus = { type: 'error', message: err.error?.error || 'Failed to submit inquiry' };
        this.inquiryLoading = false;
      }
    });
  }

  getIconClass(iconName: string): string {
    const mappings: Record<string, string> = {
      'FaCode': 'fa-solid fa-code',
      'FaBrain': 'fa-solid fa-brain',
      'FaRobot': 'fa-solid fa-robot',
      'FaSearch': 'fa-solid fa-magnifying-glass',
      'FaDatabase': 'fa-solid fa-database'
    };
    return mappings[iconName] || 'fa-solid fa-code';
  }
}
