import { AbstractControl, ValidatorFn } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;  // Don't show error if input is empty
    }
    const valid = /^[1-9]\d*$/.test(value);
    return valid ? null : { positiveNumber: true };
  };
}
