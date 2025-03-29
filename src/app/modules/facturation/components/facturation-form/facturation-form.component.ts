import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Service } from '../../../../shared/types/Services';
import { ServicesForm } from '../../../estimation/types/DevisCreationType';
import { FacturationServiceForm } from '../../types/facturation.type';

@Component({
  selector: 'app-facturation-form',
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
    ToastModule,
  ],
  templateUrl: './facturation-form.component.html',
  styleUrl: './facturation-form.component.scss',
})
export class FacturationFormComponent {
  servicesForm: FacturationServiceForm[] = [];
  @Input() services!: Service[];
  loading = false;

  constructor(private cdr: ChangeDetectorRef) {}

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
  getServiceFormTotal() {
    return this.servicesForm.reduce((acc, s) => acc + s.prix * s.heures, 0);
  }
  getServiceTotal(prix: number, heure: number, remise: number) {
    if (remise > 0) {
      return prix * heure - (prix * heure * remise) / 100;
    } else {
      return prix * heure;
    }
  }
  getTotalDefaultValue(prix: number, heure: number, remise: number) {
    if (remise > 0) {
      return prix * heure - (prix * heure * remise) / 100;
    } else {
      return prix * heure;
    }
  }
  handleAddService() {
    const newService: FacturationServiceForm = {
      _id: '',
      nom: '',
      prix: 0,
      heures: 0,
      remise: 0,
      total: 0,
    };
    this.servicesForm = [...this.servicesForm, newService];
  }

  handleSubmit() {
    console.log(this.servicesForm);
  }

  handleTotalChange(e: any, index: number) {
    const input = Number(e);
    const total =
      this.servicesForm[index].prix * this.servicesForm[index].heures;
    if (input < total) {
      const remis = total - input;
      const remise = (remis * 100) / total;
      this.servicesForm[index].remise = remise;
    } else {
      this.servicesForm[index].remise = 0;
    }
  }

  handleChangeHeures(e: any, index: number) {
    const prix = Number(this.servicesForm[index].prix);
    const heures = Number(e);
    const total = prix * heures;
    this.servicesForm[index].total = total;
    console.log(e, index);
  }
}
