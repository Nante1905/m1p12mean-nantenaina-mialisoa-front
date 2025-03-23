import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { RendezVous } from '../../../../shared/types/RendezVous';

@Component({
  selector: 'app-rdv-calendar',
  imports: [FullCalendarModule],
  templateUrl: './rdv-calendar.component.html',
  styleUrl: './rdv-calendar.component.scss',
})
export class RdvCalendarComponent implements OnInit, OnChanges {
  @Input() rdvs: RendezVous[] = [];
  @Output() onDateChange: EventEmitter<{ start: string; end: string }> =
    new EventEmitter();
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  handleDateChange(start: string, end: string) {
    this.onDateChange.emit({
      start: start,
      end: end,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.calendarOptions.events = changes['rdvs'].currentValue.map(
      (rdv: RendezVous) => ({
        start: dayjs(rdv.date).format('YYYY-MM-DD'),
        title: rdv.devis.client.nom + ' ' + rdv.devis.vehicule.modele,
        extendedProps: {
          rdv,
        },
      })
    );
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: 'fr',
    datesSet: (arg) => {
      const inside = dayjs(arg.startStr).add(15, 'day');
      const start = dayjs(inside).startOf('month').format('YYYY-MM-DD');
      const end = dayjs(inside).endOf('month').format('YYYY-MM-DD');
      this.handleDateChange(start, end);
    },
    events: this.rdvs.map((rdv) => ({
      start: dayjs(rdv.date).format('YYYY-MM-DD'),
      title: rdv.devis.client.nom + ' ' + rdv.devis.vehicule.modele,
      extendedProps: {
        rdv,
      },
      // vehicule: rdv.devis.vehicule,
    })),
    eventDidMount: (info) => {
      // console.log(info.event);
      const rdv = info.event.extendedProps['rdv'];

      tippy(info.el, {
        content: this.getTooltipContent(rdv as RendezVous),
        // content: '',
        animation: 'fade',
      });
    },
  };

  getTooltipContent(rdv: RendezVous) {
    return `
        ${rdv.devis.client.nom} ${rdv.devis.client.prenom} - ${
      rdv.devis.vehicule.modele
    } - ${rdv.devis.vehicule.immatriculation} - ${dayjs(
      rdv.date
    ).hour()}:${dayjs(rdv.date).minute()}
    `;
  }

  ngOnInit() {}
}
