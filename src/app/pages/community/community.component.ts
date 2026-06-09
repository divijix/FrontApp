import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ApiService } from '../../services/api.service';

interface Post {
  id: number;
  author_name: string;
  author_email: string;
  title: string;
  content: string;
  likes: number;
  created_at: string;
}

interface PostComment {
  id: number;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './community.component.html'
})
export class CommunityComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  posts: Post[] = [];
  loading = true;
  showModal = false;
  submitting = false;

  commentsMap: Record<number, PostComment[]> = {};
  expandedComments: Record<number, boolean> = {};
  commentForms: Record<number, FormGroup> = {};

  postForm: FormGroup = this.fb.group({
    author_name: ['', Validators.required],
    author_email: ['', [Validators.required, Validators.email]],
    title: ['', Validators.required],
    content: ['', Validators.required]
  });

  ngOnInit() {
    this.fetchApprovedPosts();
  }

  fetchApprovedPosts() {
    this.apiService.get<Post[]>('/api/posts').subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching approved posts:', err);
        this.loading = false;
      }
    });
  }

  handleSubmit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.apiService.post<any>('/api/posts', this.postForm.value).subscribe({
      next: () => {
        alert("Post submitted successfully! It will appear on the feed once approved by an admin.");
        this.postForm.reset();
        this.showModal = false;
        this.submitting = false;
        this.fetchApprovedPosts();
      },
      error: (err) => {
        alert(err.error?.error || "Failed to submit post");
        this.submitting = false;
      }
    });
  }

  handleLikePost(postId: number) {
    this.apiService.post<any>(`/api/posts/${postId}/like`, {}).subscribe({
      next: (data) => {
        this.posts = this.posts.map((p) =>
          p.id === postId ? { ...p, likes: data.likes } : p
        );
      },
      error: (err) => {
        console.error("Error liking post:", err);
      }
    });
  }

  handleToggleComments(postId: number) {
    const isExpanded = !this.expandedComments[postId];
    this.expandedComments[postId] = isExpanded;

    if (isExpanded) {
      this.fetchComments(postId);
    }
  }

  fetchComments(postId: number) {
    this.apiService.get<PostComment[]>(`/api/posts/${postId}/comments`).subscribe({
      next: (data) => {
        this.commentsMap[postId] = data;
      },
      error: (err) => {
        console.error("Error fetching comments:", err);
      }
    });
  }

  getCommentForm(postId: number): FormGroup {
    if (!this.commentForms[postId]) {
      this.commentForms[postId] = this.fb.group({
        author_name: ['', Validators.required],
        author_email: ['', [Validators.required, Validators.email]],
        content: ['', Validators.required]
      });
    }
    return this.commentForms[postId];
  }

  handleSubmitComment(postId: number) {
    const form = this.getCommentForm(postId);
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.apiService.post<any>(`/api/posts/${postId}/comments`, form.value).subscribe({
      next: () => {
        form.reset();
        this.fetchComments(postId);
      },
      error: (err) => {
        alert(err.error?.error || "Failed to post comment");
      }
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(undefined, { dateStyle: 'medium' });
  }

  formatDateShort(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(undefined, { dateStyle: 'short' });
  }
}
