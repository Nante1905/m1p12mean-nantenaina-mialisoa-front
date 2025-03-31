import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumber } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
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
    FormsModule,
    AvatarModule,
    ToastModule,
  ],
  providers: [DevisService, FormBuilder, InterventionService, MessageService],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
})
export class AddTaskFormComponent implements OnInit, OnChanges {
  users = input.required<Utilisateur[]>();

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

  responsables: Utilisateur[] = [];
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

    this.suggestions = [...this.users()].filter((u) =>
      searchRegex.test(`${u.nom} ${u.prenom}`)
    );
  }

  handleSelectResponsable(event: AutoCompleteSelectEvent) {
    const selectedUser = event.value as Utilisateur;
    if (typeof event.value == 'string') {
      // remove the user from the selected list
      this.responsables = this.responsables.filter(
        (user) => user._id !== event.value
      );
    } else {
      // check if the user is already in the selected list
      const userExists = this.responsables.some(
        (user) => user._id === selectedUser._id
      );
      if (!userExists) {
        this.responsables.push(selectedUser);
      }
      // add the user to the selected list
    }
  }

  getResponsableName(users: Utilisateur[]) {
    return (item: any) => {
      const label = users.find((u) => u._id === item);
      return label ? `${label.nom} ${label.prenom}` : item;
    };
  }
}
