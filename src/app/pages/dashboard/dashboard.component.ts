import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService, User } from '../../services/auth.service';

interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "What does RAG stand for in the context of Large Language Models?",
    options: [
      "Robotic Automated Gateways",
      "Retrieval-Augmented Generation",
      "Refined Analytical Graphs",
      "Random Access Generator"
    ],
    answer: 1
  },
  {
    q: "Which architecture introduced in 2017 forms the foundation of modern LLMs (like GPT and Claude)?",
    options: [
      "Recurrent Neural Networks (RNN)",
      "Convolutional Neural Networks (CNN)",
      "Transformer Architecture",
      "Decision Trees"
    ],
    answer: 2
  },
  {
    q: "What is the primary function of the 'temperature' parameter in an LLM API call?",
    options: [
      "Controls output randomness/creativity",
      "Sets the server processing speed",
      "Measures the temperature of GPU cores",
      "Controls the token limit of the response"
    ],
    answer: 0
  },
  {
    q: "Which of the following describes an autonomous AI Agent?",
    options: [
      "A system that strictly translates text",
      "An AI that can perceive its environment, make decisions, and execute actions to achieve a goal",
      "A database that stores vector embeddings",
      "A script that runs cron jobs"
    ],
    answer: 1
  },
  {
    q: "What is the purpose of 'Vector Embeddings' in modern AI search systems?",
    options: [
      "To compress files into smaller sizes",
      "To convert words or concepts into numerical vectors representing semantic meaning",
      "To display 3D graphic representations on websites",
      "To verify email addresses"
    ],
    answer: 1
  }
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private apiService = inject(ApiService);
  public authService = inject(AuthService);
  private router = inject(Router);

  user: User | null = null;
  sidebarOpen = false;

  // Student Dashboard State
  enrolledCourses: any[] = [];
  enrolledLoading = true;
  snapTestHistory: any[] = [];
  snapHistoryLoading = true;
  studentTab = 'overview'; // 'overview', 'snapTest', 'community'

  // Snap Test (Quiz) Engine State
  activeQuiz = false;
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  quizScore = 0;
  quizFinished = false;
  submittingQuiz = false;
  quizQuestions = QUIZ_QUESTIONS;

  // Admin Dashboard State
  adminData = {
    users: [] as any[],
    contacts: [] as any[],
    inquiries: [] as any[],
    enrollments: [] as any[],
    snapTests: [] as any[],
    courses: [] as any[],
    applications: [] as any[],
    posts: [] as any[]
  };
  adminLoading = true;
  adminError = '';
  activeTab = 'users'; // 'users', 'courses', 'enrollments', 'snapTests', 'posts', 'applications', 'contacts', 'inquiries'

  // Admin Add Course Modal State
  showAddCourseModal = false;
  courseSubmitting = false;
  courseForm = {
    title: '',
    level: 'Beginner',
    description: '',
    is_technical: 'true',
    image_url: '',
    icon_name: 'FaCode'
  };

  // Admin Comment Moderation Modal State
  showCommentsModal = false;
  commentsLoading = false;
  selectedPostId: number | null = null;
  selectedPostComments: any[] = [];

  get firstName(): string {
    return this.user?.name ? this.user.name.split(' ')[0] : '';
  }

  ngOnInit() {
    this.user = this.authService.currentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.user.role === 'admin') {
      this.fetchAdminData();
    } else {
      this.fetchEnrolledCourses();
      this.fetchSnapTestHistory();
    }
  }

  fetchEnrolledCourses() {
    this.apiService.get<any[]>('/api/my-courses', true).subscribe({
      next: (data) => {
        this.enrolledCourses = data;
        this.enrolledLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.enrolledLoading = false;
      }
    });
  }

  fetchSnapTestHistory() {
    this.apiService.get<any[]>('/api/my-snap-tests', true).subscribe({
      next: (data) => {
        this.snapTestHistory = data;
        this.snapHistoryLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.snapHistoryLoading = false;
      }
    });
  }

  fetchAdminData() {
    this.apiService.get<any>('/api/admin/data', true).subscribe({
      next: (data) => {
        this.adminData = data;
        this.adminLoading = false;
      },
      error: (err) => {
        this.adminError = err.error?.error || 'Unauthorized or server error';
        this.adminLoading = false;
      }
    });
  }

  handleLogout() {
    this.authService.logout();
    alert('Logged out successfully');
    this.router.navigate(['/login']);
  }

  // Quiz handlers
  startQuiz() {
    this.activeQuiz = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.quizScore = 0;
    this.quizFinished = false;
  }

  handleSelectOption(optionIndex: number) {
    if (this.selectedAnswer !== null) return;
    this.selectedAnswer = optionIndex;
    if (optionIndex === this.quizQuestions[this.currentQuestionIndex].answer) {
      this.quizScore++;
    }
  }

  handleNextQuestion() {
    const nextIndex = this.currentQuestionIndex + 1;
    if (nextIndex < this.quizQuestions.length) {
      this.currentQuestionIndex = nextIndex;
      this.selectedAnswer = null;
    } else {
      this.quizFinished = true;
    }
  }

  handleSubmitQuiz() {
    this.submittingQuiz = true;
    const payload = {
      score: this.quizScore,
      totalQuestions: this.quizQuestions.length,
      topic: 'AI & Modern Tech'
    };

    this.apiService.post<any>('/api/snap-tests/submit', payload, true).subscribe({
      next: () => {
        alert('Quiz score submitted successfully!');
        this.activeQuiz = false;
        this.fetchSnapTestHistory();
        this.studentTab = 'overview';
        this.submittingQuiz = false;
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to submit test results');
        this.submittingQuiz = false;
      }
    });
  }

  // Admin Course Creation handler
  handleCourseSubmit() {
    if (!this.courseForm.title.trim() || !this.courseForm.description.trim()) {
      alert('Please fill in the title and description.');
      return;
    }

    this.courseSubmitting = true;
    const payload = {
      ...this.courseForm,
      is_technical: this.courseForm.is_technical === 'true'
    };

    this.apiService.post<any>('/api/admin/courses', payload, true).subscribe({
      next: () => {
        alert('Course added successfully!');
        this.showAddCourseModal = false;
        this.courseForm = {
          title: '',
          level: 'Beginner',
          description: '',
          is_technical: 'true',
          image_url: '',
          icon_name: 'FaCode'
        };
        this.fetchAdminData();
        this.courseSubmitting = false;
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to add course');
        this.courseSubmitting = false;
      }
    });
  }

  // Admin Post Status update handler
  handleUpdatePostStatus(postId: number, newStatus: string) {
    this.apiService.put<any>(`/api/admin/posts/${postId}/status`, { status: newStatus }, true).subscribe({
      next: () => {
        alert(`Post status successfully updated to ${newStatus}`);
        this.fetchAdminData();
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to update status');
      }
    });
  }

  // Admin Comments Moderation Handlers
  handleManageComments(postId: number) {
    this.selectedPostId = postId;
    this.showCommentsModal = true;
    this.commentsLoading = true;

    this.apiService.get<any[]>(`/api/posts/${postId}/comments`).subscribe({
      next: (data) => {
        this.selectedPostComments = data;
        this.commentsLoading = false;
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to load comments');
        this.commentsLoading = false;
      }
    });
  }

  handleDeleteComment(commentId: number) {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    this.apiService.delete<any>(`/api/admin/comments/${commentId}`, true).subscribe({
      next: () => {
        alert('Comment deleted successfully.');
        this.selectedPostComments = this.selectedPostComments.filter((c) => c.id !== commentId);
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to delete comment');
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

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(undefined, { dateStyle: 'medium' });
  }

  formatDateTime(dateStr: string): string {
    return new Date(dateStr).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  }
}
