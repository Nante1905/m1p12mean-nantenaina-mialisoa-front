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
import { Observable } from 'rxjs';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ValidationErrorComponent } from '../../../../shared/components/validation-error/validation-error.component';
import { DemandeDevisForm } from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';
import { markFormAsTouchedAndDirty } from '../../../../shared/utils/form.utils';

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
  @Input() motorisations$!: Observable<Motorisation[]>;
  @Input() marques$!: Observable<Marque[]>;
  @Input() loading = false;

  constructor(private formBuilder: FormBuilder) {}

  vehicules: any[] = [
    {
      id: 0,
      name: 'Nouveau vehicule',
    },
    {
      id: 1,
      name: 'Toyota Yaris',
    },
  ];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      vehiculeId: [0, Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: ['', Validators.required],
      motorisation: ['', Validators.required],
      kilometrage: [''],
      description: ['', Validators.required],
      saveVehicule: [false],
    });

    this.disableSaveVehiculeListener();

    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.form.get('vehiculeId')?.valueChanges.subscribe((value) => {
      if (value !== 0 || value === '') {
        this.form.get('marque')?.disable();
        this.form.get('modele')?.disable();
        this.form.get('annee')?.disable();
        this.form.get('motorisation')?.disable();
        this.form.get('saveVehicule')?.disable();
      } else {
        this.form.get('marque')?.enable();
        this.form.get('modele')?.enable();
        this.form.get('annee')?.enable();
        this.form.get('motorisation')?.enable();
        this.form.get('kilometrage')?.enable();
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
