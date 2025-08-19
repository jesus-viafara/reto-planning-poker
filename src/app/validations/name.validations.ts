import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

export function maxNumbersValidator(n: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const numeros = control.value.match(/\d/g);
    const cantidadNumeros = numeros ? numeros.length : 0;
    return cantidadNumeros > 3
      ? { maxNumbers: { value: control.value } }
      : null;
  };
}

export function soloNumerosValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return /^\d+$/.test(control.value)
      ? { soloNumeros: { value: control.value } }
      : null;
  };
}
