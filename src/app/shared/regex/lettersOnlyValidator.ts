import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lettersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null;  // Don't show error if input is empty
    }
    const valid = /^[A-Za-z]+$/.test(value);
    return valid ? null : { lettersOnly: true };
  };
}