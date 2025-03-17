import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ValidationErrorComponent } from '../../../../shared/components/validation-error/validation-error.component';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';

@Component({
  selector: 'app-devis-vehicule-form',
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    ValidationErrorComponent,
    LoaderComponent,
    DatePickerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './devis-vehicule-form.component.html',
  styleUrl: './devis-vehicule-form.component.scss',
})
export class DevisVehiculeFormComponent {
  @Input() marques!: Marque[];
  @Input() motorisations!: Motorisation[];
  @Input() formVehicule!: FormGroup;
}
