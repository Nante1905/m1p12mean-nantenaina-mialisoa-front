import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ValidationErrorComponent } from '../../../../shared/components/validation-error/validation-error.component';
import { DemandeDevisForm } from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';
import { Vehicule } from '../../../../shared/types/Vehicule';
import { markFormAsTouchedAndDirty } from '../../../../shared/utils/form.utils';
import { DevisVehiculeFormComponent } from '../devis-vehicule-form/devis-vehicule-form.component';

@Component({
  selector: 'app-demande-devis-form',
  imports: [
    SelectModule,
    InputTextModule,
    TextareaModule,
    DatePickerModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    ValidationErrorComponent,
    LoaderComponent,
    CommonModule,
    DevisVehiculeFormComponent,
  ],
  templateUrl: './demande-devis-form.component.html',
  styleUrl: './demande-devis-form.component.scss',
})
export class DemandeDevisFormComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('datepicker') datepicker!: ElementRef;
  @Output() onSubmit: EventEmitter<DemandeDevisForm> =
    new EventEmitter<DemandeDevisForm>();

  disableSave = false;
  @Input() motorisations!: Motorisation[];
  @Input() marques!: Marque[];
  @Input() vehicules!: Vehicule[];
  @Input() loading = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      vehiculeId: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: ['', Validators.required],
      motorisation: ['', Validators.required],
      kilometrage: [''],
      description: ['', Validators.required],
      saveVehicule: [false],
      immatriculation: ['', Validators.required],
    });

    this.disableSaveVehiculeListener();

    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.form.get('vehiculeId')?.valueChanges.subscribe((value) => {
      if (value != 0 || value === '') {
        this.form.get('marque')?.disable();
        this.form.get('modele')?.disable();
        this.form.get('annee')?.disable();
        this.form.get('motorisation')?.disable();
        this.form.get('saveVehicule')?.disable();
        this.form.get('immatriculation')?.disable();
      } else {
        this.form.get('marque')?.enable();
        this.form.get('modele')?.enable();
        this.form.get('annee')?.enable();
        this.form.get('motorisation')?.enable();
        this.form.get('kilometrage')?.enable();
        this.form.get('saveVehicule')?.enable();
        this.form.get('immatriculation')?.enable();
      }
    });
  }

  showErrors() {
    markFormAsTouchedAndDirty(this.form);
  }

  onFormSubmit() {
    if (this.form.invalid) {
      this.showErrors();
      return;
    } else {
      this.onSubmit.emit(this.form.value);
      console.log('value', this.form.value);
    }
  }
  onSaveVehiculeChange(event: any) {
    if (event.checked.length > 0) {
      this.form.get('saveVehicule')?.setValue(true);
    } else {
      this.form.get('saveVehicule')?.setValue(false);
    }
  }
  disableSaveVehiculeListener() {
    this.form.get('vehiculeId')?.valueChanges.subscribe((value) => {
      if (value !== 0 || value === '') {
        this.disableSave = true;
      } else {
        this.disableSave = false;
      }
    });
  }
}
