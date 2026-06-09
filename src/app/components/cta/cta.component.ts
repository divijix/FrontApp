import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.component.html'
})
export class CtaComponent {
  @Output() applyClicked = new EventEmitter<void>();
  @Output() demoClicked = new EventEmitter<void>();
}
