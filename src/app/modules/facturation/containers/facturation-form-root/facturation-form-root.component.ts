import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Service } from '../../../../shared/types/Services';
import { DevisService } from '../../../estimation/services/devis.service';
import { InterventionService } from '../../../intervention/services/intervention.service';
import { FacturationFormComponent } from '../../components/facturation-form/facturation-form.component';
import { FacturationServiceForm } from '../../types/facturation.type';

@Component({
  selector: 'app-facturation-form-root',
  imports: [FacturationFormComponent, CommonModule],
  providers: [DevisService],
  templateUrl: './facturation-form-root.component.html',
  styleUrl: './facturation-form-root.component.scss',
})
export class FacturationFormRootComponent implements OnInit {
  constructor(
    private devisService: DevisService,
    private route: ActivatedRoute,
    private interventionService: InterventionService
  ) {}

  serviceForm: FacturationServiceForm[] = [
    {
      _id: '67d812a62790745db95a57d7',
      nom: 'Remplacement pare-brise',
      prix: 900000,
      heures: 2,
      remise: 0,
      total: 0,
    },
  ];

  services$!: Observable<Service[]>;
  ngOnInit(): void {
    this.services$ = this.devisService
      .findAllServices()
      .pipe(map((res) => res.data));

    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const idIntervention = params['intervention'];

      if (idIntervention) {
        console.log('Valeur de idIntervention:', idIntervention);
        // this.interventionService
        //   .findInterventionById(idIntervention)
        //   .subscribe((res) => {
        //     console.log(res.data);
        //     this.serviceForm = res.data.services;
        //   });
      }
    });
  }
}
