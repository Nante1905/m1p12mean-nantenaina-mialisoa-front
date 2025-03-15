import { UntypedFormGroup } from '@angular/forms';

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
