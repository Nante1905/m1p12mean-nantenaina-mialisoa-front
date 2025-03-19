import { Component } from '@angular/core';
import { ListRdvComponent } from '../../components/list-rdv/list-rdv.component';
import { RdvCalendarComponent } from '../../components/rdv-calendar/rdv-calendar.component';

@Component({
  selector: 'app-list-rdv-root',
  imports: [ListRdvComponent, RdvCalendarComponent],
  templateUrl: './list-rdv-root.component.html',
  styleUrl: './list-rdv-root.component.scss',
})
export class ListRdvRootComponent {}
