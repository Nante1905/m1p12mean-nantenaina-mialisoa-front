import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { finalize } from 'rxjs';
import { defaultPaginatedData } from '../../../../shared/constants/pagination';
import { Facture } from '../../../../shared/types/Facture';
import { Paginated } from '../../../../shared/types/Paginated';
import { FactureService } from '../../services/facture.service';

@Component({
  selector: 'app-facture-list',
  imports: [TableModule, ButtonModule, CommonModule],
  providers: [FactureService],
  templateUrl: './facture-list.component.html',
  styleUrl: './facture-list.component.scss',
})
export class FactureListComponent implements OnChanges {
  @Input() factures: Paginated<Facture> = defaultPaginatedData;
  loadingExport: boolean[] = [];
  expandedRows = {};

  constructor(private factureService: FactureService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  downloadPDF(factureId: string, index: number): void {
    this.loadingExport[index] = true;
    this.factureService
      .downloadFacturePDF(factureId)
      .pipe(
        finalize(() => {
          this.loadingExport[index] = false;
        })
      )
      .subscribe((blob) => {
        // Créer une URL pour le blob
        const url = window.URL.createObjectURL(blob);

        // Créer un élément d'ancrage temporaire
        const a = document.createElement('a');
        a.href = url;
        a.download = `facture-${factureId}.pdf`;

        // Simuler un clic sur l'élément
        document.body.appendChild(a);
        a.click();

        // Nettoyer
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  }
}
