import { Component } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  activeIndex: number | null = null;

  toggleFaq(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  faqs: FaqItem[] = [
    {
      question: "Who can enroll in these programs?",
      answer: "Anyone interested in AI, coding, or Data Science can join."
    },
    {
      question: "Are the classes online?",
      answer: "Yes, all programs are fully online with live mentorship."
    },
    {
      question: "Do I need coding experience?",
      answer: "No, beginner-friendly tracks are available."
    }
  ];
}
