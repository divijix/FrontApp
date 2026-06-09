import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface Course {
  id?: number;
  title: string;
  description: string;
  level: string;
  is_technical: boolean;
  icon_name: string;
}

@Component({
  selector: 'app-programs',
  standalone: true,
  templateUrl: './programs.component.html'
})
export class ProgramsComponent implements OnInit {
  private apiService = inject(ApiService);

  courses: Course[] = [];
  loading = true;

  ngOnInit() {
    this.apiService.get<Course[]>('/api/courses').subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching homepage courses:', err);
        this.loading = false;
      }
    });
  }

  getIconClass(course: Course): string {
    if (!course.is_technical) {
      return 'fa-solid fa-brain';
    }
    const mappings: Record<string, string> = {
      'FaCode': 'fa-solid fa-code',
      'FaBrain': 'fa-solid fa-brain',
      'FaRobot': 'fa-solid fa-robot',
      'FaSearch': 'fa-solid fa-magnifying-glass',
      'FaDatabase': 'fa-solid fa-database'
    };
    return mappings[course.icon_name] || 'fa-solid fa-code';
  }
}
