import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

import { isForbidden } from '../validator';

@ValidatorConstraint()
export class IsForbiddenValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [forbiddenValue] = args.constraints;
    return !isForbidden(value, forbiddenValue);
  }
}

export function IsForbidden(forbiddenValue: string, validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {...validationOptions, message: validationOptions?.message ?? `${propertyName} contains forbidden value`},
      constraints: [forbiddenValue],
      validator: IsForbiddenValidator
    });
  };
}
