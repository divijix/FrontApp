import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './about.component.html'
})
export class AboutComponent {}
