import { Component, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  @Output() applyClicked = new EventEmitter<void>();
  @Output() exploreClicked = new EventEmitter<void>();
  
  private fb = inject(FormBuilder);

  openForm = false;
  
  enquiryForm: FormGroup = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  handleSubmit() {
    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();
      return;
    }

    console.log(this.enquiryForm.value);
    alert("Enquiry Submitted Successfully 🚀");
    this.enquiryForm.reset();
    this.openForm = false;
  }
}
