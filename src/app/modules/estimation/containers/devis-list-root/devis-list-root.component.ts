import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { map, Observable } from 'rxjs';
import { Devis } from '../../../../shared/types/Devis';
import { DemandeDevisListComponent } from '../../components/demande-devis-list/demande-devis-list.component';
import { DevisListComponent } from '../../components/devis-list/devis-list.component';
import { DevisService } from '../../services/devis.service';
import {
  DemandeDevisDataResponse,
  DemandeDevisFilter,
} from '../../types/DemandeDevis';

@Component({
  selector: 'app-devis-list-root',
  imports: [
    ButtonModule,
    TabsModule,
    DemandeDevisListComponent,
    CommonModule,
    CardModule,
    DevisListComponent,
  ],
  templateUrl: './devis-list-root.component.html',
  styleUrl: './devis-list-root.component.scss',
})
export class DevisListRootComponent implements OnInit {
  constructor(private devisService: DevisService) {}

  demandeDevis$!: Observable<DemandeDevisDataResponse>;
  listDevis: Devis[] = [];

  ngOnInit(): void {
    this.demandeDevis$ = this.devisService
      .findAllDemandeDevis()
      .pipe(map((res) => res.data));

    this.listDevis = this.devisService.findAllDevis();
  }

  filterData = (filter: DemandeDevisFilter) => {
    console.log(filter);
    this.demandeDevis$ = this.devisService
      .findAllDemandeDevis(filter)
      .pipe(map((res) => res.data));
  };
}
