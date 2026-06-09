import { Component } from '@angular/core';

interface Review {
  name: string;
  role: string;
  review: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
  reviews: Review[] = [
    {
      name: "Priya Sharma",
      role: "AI Engineer",
      review: "The programs completely changed my career. I landed my dream AI job within months."
    },
    {
      name: "Rahul Verma",
      role: "ML Developer",
      review: "Hands-on projects and mentorship helped me build real-world AI applications."
    },
    {
      name: "Anjali Patel",
      role: "Data Scientist",
      review: "The curriculum is industry-ready and very practical for beginners."
    }
  ];
}
