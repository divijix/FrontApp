import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { ProgramsComponent } from '../../components/programs/programs.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    StatsComponent,
    ProgramsComponent,
    FeaturesComponent,
    TestimonialsComponent,
    FaqComponent,
    CtaComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
