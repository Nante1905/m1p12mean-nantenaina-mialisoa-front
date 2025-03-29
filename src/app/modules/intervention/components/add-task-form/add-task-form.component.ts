import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumber } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { catchError, finalize, map, Observable } from 'rxjs';
import { ValidationErrorComponent } from '../../../../shared/components/validation-error/validation-error.component';
import { Service } from '../../../../shared/types/Services';
import { Utilisateur } from '../../../../shared/types/Utilisateur';
import {
  markFormAsTouchedAndDirty,
  showToastError,
  showToastSuccess,
} from '../../../../shared/utils/form.utils';
import { DevisService } from '../../../estimation/services/devis.service';
import { InterventionService } from '../../services/intervention.service';

@Component({
  selector: 'app-add-task-form',
  imports: [
    DialogModule,
    ButtonModule,
    SelectModule,
    InputNumber,
    AutoCompleteModule,
    CommonModule,
    ReactiveFormsModule,
    ValidationErrorComponent,
  ],
  providers: [DevisService, FormBuilder, InterventionService, MessageService],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
})
export class AddTaskFormComponent implements OnInit, OnChanges {
  users = [
    {
      id: '21350',
      nom: 'Rakoto',
      prenom: 'JEan',
      email: 'jean@test.com',
    },
    {
      id: '213',
      nom: 'Rabe',
      prenom: 'Marc',
      email: 'jean@test.com',
    },
    {
      id: '2150',
      nom: 'Rakoto',
      prenom: 'Kely',
      email: 'jean@test.com',
    },
    {
      id: '210',
      nom: 'Rasoa',
      prenom: 'JEan',
      email: 'jean@test.com',
    },
    {
      id: '20',
      nom: 'RAvao',
      prenom: 'Be',
      email: 'jean@test.com',
    },
  ];

  constructor(
    private devisService: DevisService,
    private formBuilder: FormBuilder,
    private interventionService: InterventionService,
    private messageService: MessageService
  ) {}

  @Input() visible: boolean = false;
  @Input() idIntervention: string = '';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  formGroup!: FormGroup;
  services$!: Observable<Service[]>;

  suggestions: Partial<Utilisateur>[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.services$ = this.devisService
      .findAllServices()
      .pipe(map((res) => res.data));

    this.formGroup = this.formBuilder.group({
      idIntervention: [this.idIntervention],
      service: ['', Validators.required],
      heure: [0, [Validators.required, Validators.min(1)]],
      responsables: [[]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idIntervention']) {
      if (this.formGroup) {
        console.log(changes);

        this.formGroup.get('idIntervention')?.setValue(this.idIntervention);
      }
    }
  }

  handleClose() {
    this.onClose.emit();
  }

  handleSubmit() {
    if (this.formGroup.invalid) {
      markFormAsTouchedAndDirty(this.formGroup);
      return;
    }

    this.loading = true;
    const { idIntervention, ...data } = this.formGroup.value;

    console.log(data, idIntervention);
    this.interventionService
      .addTache(idIntervention, data)
      .pipe(
        catchError((err) => {
          showToastError(err.message || err.error.message, this.messageService);
          return [];
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(() => {
        showToastSuccess('Tâche ajoutée avec succès', this.messageService);
        this.handleClose();
      });
  }

  autoComplete(event: AutoCompleteCompleteEvent) {
    const queryParts = event.query
      .split(/\s+/)
      .filter((part) => part.trim() !== '');
    const searchRegex = new RegExp(
      queryParts.map((part) => `(?=.*${part})`).join(''),
      'i'
    );

    this.suggestions = [...this.users].filter((u) =>
      searchRegex.test(`${u.nom} ${u.prenom}`)
    );
  }
}
