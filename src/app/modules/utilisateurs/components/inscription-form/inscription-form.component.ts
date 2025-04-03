import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ValidationErrorComponent } from '../../../../shared/components/validation-error/validation-error.component';
import {
  generateRandomPassword,
  markFormAsTouchedAndDirty,
  validatePhoneNumber,
} from '../../../../shared/utils/form.utils';
import { InscriptionFormDTO } from '../../types/inscription';

@Component({
  selector: 'app-inscription-form',
  imports: [
    CardModule,
    InputTextModule,
    ValidationErrorComponent,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss',
})
export class InscriptionFormComponent implements OnInit, OnDestroy {
  inscriptionForm!: FormGroup;

  title = input<string>('Inscription');
  loading = input<boolean>(false);
  addGenerateRandomPwd = input<boolean>(false);
  addConfirmPwd = input<boolean>(false);

  onSubmit = output<InscriptionFormDTO>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnDestroy(): void {
    console.log('unmoint');

    this.inscriptionForm.reset();
  }

  ngOnInit(): void {
    this.inscriptionForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, validatePhoneNumber()]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmPwd: ['', this.validateConfirmPwd(this.addConfirmPwd())],
    });
  }

  handleSubmit() {
    if (this.inscriptionForm.invalid) {
      markFormAsTouchedAndDirty(this.inscriptionForm);
    } else {
      const { confirmPwd, ...rest } = this.inscriptionForm.value;

      this.onSubmit.emit(this.addConfirmPwd() ? { confirmPwd, ...rest } : rest);
    }
  }
  generatePwd() {
    this.inscriptionForm.patchValue({ pwd: generateRandomPassword(8) });
  }

  validateConfirmPwd = (isRequired: boolean): ValidatorFn => {
    return (control: AbstractControl) => {
      const parent = control.parent;
      if (!parent) {
        return null;
      }
      const pwdValue = parent.get('pwd')?.value;
      const confirmPwdValue = control.value;
      if (!isRequired || pwdValue === confirmPwdValue) {
        return null;
      }

      return { invalidConfirmPassword: { value: control.value } };
    };
  };
}
