import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
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
  ],
  providers: [ReactiveFormsModule],
  templateUrl: './creation-devis-form.component.html',
  styleUrl: './creation-devis-form.component.scss',
})
export class CreationDevisFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  marques: any[] | undefined;
  motorisations: any[] | undefined;
  services: any[] = [
    {
      _id: '1',
      nom: 'Vidange',
      prix: 100,
    },
    {
      _id: '2',
      nom: 'Vidange + Filtre',
      prix: 150,
    },
    {
      _id: '3',
      nom: 'Vidange + Filte + Bougie',
      prix: 200,
    },
  ];

  servicesForm: ServicesForm[] = [
    {
      _id: '1',
      nom: 'Vidange',
      prix: 100,
      idService: '1',
      heures: 6,
    },
    {
      _id: '3',
      nom: 'Vidange + Filte + Bougie',
      prix: 200,
      idService: '3',
      heures: 456,
    },
  ];

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
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required, Validators.pattern('^[0-9]*$')],
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
    this.servicesForm[index].idService = this.services[changeIndex]._id;
    this.servicesForm[index].nom = this.services[changeIndex].nom;
    this.servicesForm[index].prix = this.services[changeIndex].prix;
  }

  handleSubmit() {
    console.log({
      services: this.servicesForm,
      vehicule: this.formVehicule.value,
      client: this.formClient.value,
    });
  }

  getServiceFormTotal() {
    return this.servicesForm.reduce((acc, s) => acc + s.prix * s.heures, 0);
  }
}

interface ServicesForm {
  _id: string;
  idService: string;
  nom: string;
  prix: number;
  heures: number;
}
