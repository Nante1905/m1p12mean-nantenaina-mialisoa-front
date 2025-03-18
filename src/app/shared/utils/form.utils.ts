import { HttpErrorResponse } from '@angular/common/http';
import { UntypedFormGroup } from '@angular/forms';
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
