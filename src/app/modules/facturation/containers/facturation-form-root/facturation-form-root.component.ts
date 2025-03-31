import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { Facture } from '../../../../shared/types/Facture';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';
import { Service } from '../../../../shared/types/Services';
import { Utilisateur } from '../../../../shared/types/Utilisateur';
import { Vehicule } from '../../../../shared/types/Vehicule';
import {
  showToastError,
  showToastSuccess,
} from '../../../../shared/utils/form.utils';
import { DevisService } from '../../../estimation/services/devis.service';
import { InterventionService } from '../../../intervention/services/intervention.service';
import { FacturationFormComponent } from '../../components/facturation-form/facturation-form.component';
import { FactureService } from '../../services/facture.service';
import { FacturationServiceForm } from '../../types/facturation.type';

@Component({
  selector: 'app-facturation-form-root',
  imports: [FacturationFormComponent, CommonModule],
  providers: [DevisService, FactureService],
  templateUrl: './facturation-form-root.component.html',
  styleUrl: './facturation-form-root.component.scss',
})
export class FacturationFormRootComponent implements OnInit {
  constructor(
    private devisService: DevisService,
    private route: ActivatedRoute,
    private interventionService: InterventionService,
    private messageService: MessageService,
    private factureService: FactureService
  ) {}

  loading = false;
  serviceForm: FacturationServiceForm[] = [];
  client!: Utilisateur;
  vehicule!: Vehicule;

  services$!: Observable<Service[]>;
  ngOnInit(): void {
    this.services$ = this.devisService
      .findAllServices()
      .pipe(map((res) => res.data));

    console.log('init');
    this.route.queryParams.subscribe((params) => {
      const idIntervention = params['intervention'];

      if (idIntervention) {
        console.log('Valeur de idIntervention:', idIntervention);
        console.log(idIntervention);

        this.interventionService
          .findInterventionWithService(idIntervention)
          .pipe(
            map((res) => res.data),
            catchError((err) => {
              showToastError(
                err.message || err.error.message,
                this.messageService
              );
              return of(null);
            })
          )
          .subscribe((res) => {
            if (res) {
              this.serviceForm = res.services.map((s) => ({
                _id: s._id,
                nom: s.nom,
                prix: s.prix,
                heures: s.estimation,
                remise: 0,
                total: s.prix * s.estimation,
              }));
              this.client = res.client;
              this.vehicule = res.vehicule;
            }
          });
        // this.interventionService
        //   .findInterventionById(idIntervention)
        //   .subscribe((res) => {
        //     console.log(res.data);
        //     this.serviceForm = res.data.services;
        //   });
      }
    });
  }

  getVehiculeMarque() {
    return (this.vehicule.marque as Marque).nom;
  }
  getVehiculeMotorisation() {
    return (this.vehicule.motorisation as Motorisation).nom;
  }

  handleSubmit(value: any) {
    this.loading = true;
    const facture: Facture = {
      _id: '',
      date: '',
      ref: '',
      client: this.client,
      vehicule: this.vehicule,
      details: value.details.map((s: any) => ({
        idService: s._id,
        prix: s.prix,
        heures: s.heures,
        designation: s.nom,
        remise: s.remise,
      })),
      remise: value.remise,
    };
    this.factureService
      .createFacture(facture)
      .pipe(
        tap((res) => {
          showToastSuccess('Facture créé avec succès', this.messageService);
        }),
        catchError((err) => {
          showToastError(err.message || err.error.message, this.messageService);
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
    console.log(facture);
  }
}
