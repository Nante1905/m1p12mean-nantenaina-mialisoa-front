import { CommonModule } from '@angular/common';
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
  minlength: 'Ce champ doit comporter au moins {requiredLength} caractères',
  maxlength: 'Ce champ ne doit pas dépasser {requiredLength} caractères',
  min: 'La valeur ne peut pas être inférieure à {min}',
  max: 'La valeur ne peut pas être supérieure à {max}',
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
}
