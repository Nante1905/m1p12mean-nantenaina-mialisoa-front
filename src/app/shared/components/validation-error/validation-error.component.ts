import { CommonModule, KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

// type ValidationErrorType =
//   | 'required'
//   | 'email'
//   | 'min'
//   | 'max'
//   | 'minlength'
//   | 'maxlength'
//   | 'chooseASim'
//   | 'notEnoughBalance'
//   | 'invalidOtp'
//   | 'emailAlreadyUsed'
//   | 'invalid';

export const VALIDATION_ERROR_LABELS: Record<string, string> = {
  required: 'Ce champ est obligatoire',
  email: 'Veuillez entrer une adresse e-mail valide',
  min: 'La valeur ne peut pas être inférieure',
  max: 'La valeur ne peut pas être supérieure',
  pattern: 'Format incorrect',
  passwordMismatch: 'Les mots de passe ne correspondent pas',
  usernameExists: "Ce nom d'utilisateur est déjà pris",
  emailExists: 'Cette adresse e-mail est déjà utilisée',
  invalidPhoneNumber: 'Numéro de téléphone invalide',
  invalidDate: 'Date invalide',
  futureDate: 'La date doit être dans le futur',
  pastDate: 'La date doit être dans le passé',
  invalidUrl: 'URL invalide',
  invalidCreditCard: 'Numéro de carte de crédit invalide',
  invalidPostalCode: 'Code postal invalide',
  invalidIpAddress: 'Adresse IP invalide',
  invalidTime: "Format d'heure invalide",
  passwordStrength:
    'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
  whitespace: 'Ce champ ne peut pas contenir uniquement des espaces',
  noSpecialChars: 'Les caractères spéciaux ne sont pas autorisés',
  invalidConfirmPassword: 'Ne correspond pas au mot de passe',
};

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
  imports: [CommonModule],
})
export class ValidationErrorComponent {
  errorLabels: Record<string, string> = VALIDATION_ERROR_LABELS;
  @Input() control!: AbstractControl;
  @Input() customErrorLabels?: Record<string, string>;

  getErrorMessage(controlError: KeyValue<string, any>) {
    return (this.customErrorLabels &&
      this.customErrorLabels[controlError.key]) ||
      controlError.key == 'minlength'
      ? `La longueur minimale est de ${controlError.value.requiredLength} caractères`
      : controlError.key ==
        `La longueur maximale est de ${controlError.value.requiredLength} caractères`
      ? ''
      : this.errorLabels[controlError.key];
  }
}
