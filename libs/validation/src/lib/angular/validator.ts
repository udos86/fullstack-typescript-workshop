import { Directive, OnChanges, Input, SimpleChanges, ExistingProvider, forwardRef } from '@angular/core';
import { Validator, ValidatorFn, Validators, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

import { isForbidden } from '../validator';

export function forbiddenValidator(forbiddenValue: string): ValidatorFn {

  if (typeof forbiddenValue !== "string") {
    return Validators.nullValidator;
  }

  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (value === null || value.length === 0) {
      return null;
    }

    return isForbidden(value, forbiddenValue) ? { forbidden: true } : null;
  }
}

export const FORBIDDEN_VALIDATOR_PROVIDER: ExistingProvider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ForbiddenValidatorDirective),
  multi: true
};

@Directive({
  selector: '[forbidden][ngModel], [forbidden][formControlName]',
  providers: [FORBIDDEN_VALIDATOR_PROVIDER]
})
export class ForbiddenValidatorDirective implements Validator, OnChanges {

  private validator: ValidatorFn;

  @Input() forbidden: string;

  ngOnChanges(changes: SimpleChanges) {
    if ('forbidden' in changes) {
      this.validator = forbiddenValidator(this.forbidden);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control);
  }
}
