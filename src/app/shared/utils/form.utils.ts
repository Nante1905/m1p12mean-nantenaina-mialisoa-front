import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { MessageService } from 'primeng/api';

export const markFormAsTouchedAndDirty = (form: UntypedFormGroup) => {
  Object.keys(form.controls).forEach((key) => {
    const currentControl = form.controls[key] as UntypedFormGroup;
    if (currentControl.controls) {
      markFormAsTouchedAndDirty(currentControl);
    }
    currentControl.markAsDirty();
    currentControl.markAsTouched();
  });
};

export const showToastError = (
  message: string,
  messageService: MessageService
) => {
  messageService.add({
    severity: 'error',
    summary: 'Erreur',
    detail: message,
  });
};

export const showToastSuccess = (
  message: string,
  messageService: MessageService
) => {
  messageService.add({
    severity: 'success',
    summary: 'Succès',
    detail: message,
  });
};

export const handleResponse = (res: any, messageService: MessageService) => {
  if (res instanceof HttpErrorResponse) {
    showToastError(res.error.message, messageService);
  } else {
    showToastSuccess(res.message, messageService);
  }
};

export const phoneRegex = /0(32|33|34|37|38|20)[0-9]{7}/;

export const validatePhoneNumber = (): ValidatorFn => {
  return (control: AbstractControl) => {
    if (phoneRegex.test(control.value)) {
      return null;
    }
    return { invalidPhoneNumber: { value: control.value } };
  };
};

export const generateRandomPassword = (length: number = 8) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#_';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};
