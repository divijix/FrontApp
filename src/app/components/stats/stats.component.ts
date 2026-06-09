import { Component } from '@angular/core';

interface Stat {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  courses: Stat[] = [
    {
      number: "$1.8T",
      title: "Global AI Market by 2030",
      description: "Artificial Intelligence is becoming the world's largest technology revolution."
    },
    {
      number: "97M",
      title: "New AI Jobs",
      description: "Millions of AI and Data Science jobs are expected worldwide."
    },
    {
      number: "3-5x",
      title: "Salary Growth",
      description: "AI Engineers earn significantly higher salaries than traditional roles."
    }
  ];
}
