import { Component } from '@angular/core';

interface Feature {
  iconClass: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.component.html'
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      iconClass: 'fa-solid fa-laptop-code',
      title: 'Industry-Ready Curriculum',
      description: 'Learn the most in-demand AI skills with practical training.'
    },
    {
      iconClass: 'fa-solid fa-diagram-project',
      title: 'Hands-on Projects',
      description: 'Build real-world AI applications and deploy solutions.'
    },
    {
      iconClass: 'fa-solid fa-user-graduate',
      title: 'Expert Mentorship',
      description: 'Get guidance from experienced AI engineers and mentors.'
    },
    {
      iconClass: 'fa-solid fa-flask',
      title: 'Research-Oriented',
      description: 'Explore advanced AI technologies and innovations.'
    }
  ];
}
