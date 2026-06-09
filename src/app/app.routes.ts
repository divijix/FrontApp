import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'courses', loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent) },
  { path: 'community', loadComponent: () => import('./pages/community/community.component').then(m => m.CommunityComponent) },
  { path: 'Research', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: 'Blog', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
