import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationErrorComponent } from '../../../../shared/components/validation-error/validation-error.component';

@Component({
  selector: 'app-client-form',
  imports: [InputTextModule, ReactiveFormsModule, ValidationErrorComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class ClientFormComponent {
  formClient = input.required<FormGroup>();
}
