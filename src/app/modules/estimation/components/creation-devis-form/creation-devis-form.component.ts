import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';
import { Service } from '../../../../shared/types/Services';
import {
  markFormAsTouchedAndDirty,
  showToastError,
} from '../../../../shared/utils/form.utils';
import { DevisCreationType, ServicesForm } from '../../types/DevisCreationType';
import { ClientFormComponent } from '../client-form/client-form.component';
import { DevisVehiculeFormComponent } from '../devis-vehicule-form/devis-vehicule-form.component';
@Component({
  selector: 'app-creation-devis-form',
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    ReactiveFormsModule,
    DevisVehiculeFormComponent,
    ClientFormComponent,
    ToastModule,
  ],
  providers: [ReactiveFormsModule, MessageService],
  templateUrl: './creation-devis-form.component.html',
  styleUrl: './creation-devis-form.component.scss',
})
export class CreationDevisFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}
  @Input() marques!: Marque[];
  @Input() motorisations!: Motorisation[];
  @Input() services!: Service[];
  @Input() loading = false;

  @Output() onSubmit: EventEmitter<DevisCreationType> =
    new EventEmitter<DevisCreationType>();

  servicesForm: ServicesForm[] = [];

  formVehicule!: FormGroup;
  formClient!: FormGroup;

  ngOnInit(): void {
    this.formVehicule = this.formBuilder.group({
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: ['', Validators.required],
      motorisation: ['', Validators.required],
      kilometrage: [''],
      immatriculation: ['', Validators.required],
    });

    this.formClient = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  handleAddService() {
    const newService: ServicesForm = {
      _id: '',
      idService: '',
      nom: '',
      prix: 0,
      heures: 0,
    };
    this.servicesForm = [...this.servicesForm, newService];
  }

  handeDeleteService(index: number) {
    this.servicesForm = this.servicesForm.filter((s, i) => i !== index);
  }

  handleServiceChange(service: ServicesForm, index: number) {
    const changeIndex = this.services.findIndex(
      (s) => s._id == service.idService
    );
    console.log(changeIndex);
    // this.servicesForm[index] = this.services[changeIndex];
    this.servicesForm[index]._id = this.services[changeIndex]._id;
    this.servicesForm[index].nom = this.services[changeIndex].nom;
    this.servicesForm[index].prix = this.services[changeIndex].prix;
  }

  handleSubmit() {
    if (this.formVehicule.invalid || this.formClient.invalid) {
      markFormAsTouchedAndDirty(this.formVehicule);
      markFormAsTouchedAndDirty(this.formClient);
      return;
    }
    if (this.servicesForm.length === 0) {
      showToastError(
        'Veuillez ajouter au moins un service',
        this.messageService
      );
      return;
    }

    this.onSubmit.emit({
      services: this.servicesForm,
      vehicule: this.formVehicule.value,
      client: this.formClient.value,
    });
  }

  getServiceFormTotal() {
    return this.servicesForm.reduce((acc, s) => acc + s.prix * s.heures, 0);
  }
}
