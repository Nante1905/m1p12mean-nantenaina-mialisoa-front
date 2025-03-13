import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DemandeDevis } from '../../types/DemandeDevis';

@Component({
  selector: 'app-demande-devis-form',
  imports: [
    SelectModule,
    InputTextModule,
    TextareaModule,
    DatePickerModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './demande-devis-form.component.html',
  styleUrl: './demande-devis-form.component.scss',
})
export class DemandeDevisFormComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('datepicker') datepicker!: ElementRef;
  @Output() onSubmit: EventEmitter<DemandeDevis> =
    new EventEmitter<DemandeDevis>();

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

  motorisations: any[] = [
    {
      id: 0,
      name: 'Essence',
    },
    {
      id: 1,
      name: 'Diesel',
    },
    {
      id: 1,
      name: 'Electrique',
    },
  ];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      vehicule: 0,
      marque: new FormControl('', {}),
      modele: [''],
      annee: [''],
      motorisation: [''],
      description: [''],
    });

    console.log(this.form);

    this.form.get('vehicule')?.valueChanges.subscribe((value) => {
      if (value !== 0 || value === '') {
        this.form.get('marque')?.disable();
        this.form.get('modele')?.disable();
        this.form.get('annee')?.disable();
        this.form.get('motorisation')?.disable();
      } else {
        this.form.get('marque')?.enable();
        this.form.get('modele')?.enable();
        this.form.get('annee')?.enable();
        this.form.get('motorisation')?.enable();
      }
    });
  }

  onFormSubmit() {
    this.onSubmit.emit(this.form.value);
  }
}
