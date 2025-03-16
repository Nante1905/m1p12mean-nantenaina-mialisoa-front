import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { DemandeDevisListComponent } from '../../components/demande-devis-list/demande-devis-list.component';

@Component({
  selector: 'app-devis-list-root',
  imports: [ButtonModule, TabsModule, DemandeDevisListComponent],
  templateUrl: './devis-list-root.component.html',
  styleUrl: './devis-list-root.component.scss',
})
export class DevisListRootComponent {}
