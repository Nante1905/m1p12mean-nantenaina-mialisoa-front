import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { Comment, Tache } from '../../../../shared/types/Intervention';
import { TicketComponent } from '../../components/ticket/ticket.component';

@Component({
  selector: 'app-tableau-tache',
  imports: [TicketComponent, DrawerModule, CommonModule],
  templateUrl: './tableau-tache.component.html',
  styleUrl: './tableau-tache.component.scss',
})
export class TableauTacheComponent {
  selectedTache?: Tache;
  showDetailsTache: boolean = false;

  comments: Comment[] = [];

  selectTache(tache: Tache) {
    this.selectedTache = tache;
    this.showDetailsTache = true;
  }
}
