# Step-by-step guide

## 1 - Project Setup

Create the **Nx** workspace via `npx`:
```
npx create-nx-workspace@latest <project-name>
```

## 2A [FRONTEND] - Angular Setup

1. Create the **Angular** application:
```
ng add @nrwl/angular 
ng g @nrwl/angular:application frontend
```

2. Install Bootstrap:
```
npm i bootstrap
```

## 2B [FRONTEND] - Form UI

1. Import Bootstrap into your `styles.scss`:
```css
@import 'bootstrap/dist/css/bootstrap.min.css';
```

2. Add the form markup to your `app.component.html`: 
```html
<main class="container-fluid">

  <h1 class="text-center">Fullstack TypeScript Sample</h1>

  <form>

    <!-- FIRST NAME -->
    <div class="form-group">

      <label for="firstName" class="col-sm-12 control-label">First Name</label>
      <div class="col-sm-12">
        <input type="text" class="form-control" id="firstName" placeholder="First Name">
      </div>

    </div>

    <!-- LAST NAME -->
    <div class="form-group">

      <label for="lastName" class="col-sm-12 control-label">Last Name</label>
      <div class="col-sm-12">
        <input type="text" class="form-control" id="lastName" placeholder="Last Name">
      </div>

    </div>

    <!-- EMAIL -->
    <div class="form-group">

      <label for="email" class="col-sm-12 control-label">E-Mail</label>
      <div class="col-sm-12">
        <input type="text" class="form-control" id="email" placeholder="E-Mail">
      </div>

    </div>

    <div class="form-group">

      <div class="col-sm-12">
        <button type="submit" class="btn btn-primary">Send</button>
      </div>

    </div>

  </form>

</main>
```

3. Add the styles to your `app.component.scss`:
```css
main {
  max-width: 640px;
}

main > h1 {
  margin-top: 0;
  margin-bottom: 4rem;
}

button[type="submit"] {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
```

## 2C [FRONTEND] - Form Bindings

1. Import the `ReactiveFormsModule` into your `AppModule`:
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. Create a `FormGroup` via `FormBuilder` in your `app.component.ts`:

```ts
export class AppComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      firstName: null,
      lastName: null,
      email: null
    });
  }
}
```

3. Bind the `FormGroup` fields to the corresponding markup:
```html
<form [formGroup]="formGroup">

  <!-- FIRST NAME -->
  <div class="form-group">

    <label for="firstName" class="col-sm-12 control-label">First Name</label>
    <div class="col-sm-12">
      <input type="text" class="form-control" id="firstName" placeholder="First Name" formControlName="firstName">
    </div>

  </div>

  <!-- LAST NAME -->
  <div class="form-group">

    <label for="lastName" class="col-sm-12 control-label">Last Name</label>
    <div class="col-sm-12">
      <input type="text" class="form-control" id="lastName" placeholder="Last Name" formControlName="lastName">
    </div>

  </div>

  <!-- EMAIL -->
  <div class="form-group">

    <label for="email" class="col-sm-12 control-label">E-Mail</label>
    <div class="col-sm-12">
      <input type="text" class="form-control" id="email" placeholder="E-Mail" formControlName="email">
    </div>

  </div>

  <div class="form-group">

    <div class="col-sm-12">
      <button type="submit" class="btn btn-primary">Send</button>
    </div>

  </div>

</form>
```

4. Optionally visualize the form bindings via `JsonPipe`:
```html
  ...

  <div class="form-group">
    <div class="col-sm-12">
        <pre class="">{{formGroup.value | json}}</pre>
    </div>
  </div>

</form>
```

```css
pre {
  background-color: #f5f5f5;
  border: 1px solid #ababab;
}
```

## 3A [BACKEND] - NestJS Setup

Create the **Nest** backend application:
```
ng add @nrwl/nest
ng g @nrwl/nest:application backend --frontend-project frontend 
```

## 3B [BACKEND] - Form Endpoint
1. Add a form dto to `dto/user.dto.ts`:
```ts
export class CreateUserDto {

  firstName: string;

  lastName: string;

  email: string;
}
```

2. Add the form endpoint to your `app.controller.ts`:
```ts
import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateUserDto } from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/users')
  create(@Body() body: CreateUserDto) {
    console.log(body);
    return `"New user ${body.firstName} ${body.lastName} created"`;
  }
}
```

3. Enable **CORS** in your `main.ts`:
```ts
async function bootstrap() {

  ...

  app.enableCors();
}
```


## 4 [FRONTEND] - Form Submission
 
1. Import the `HttpClientModule` into your `AppModule`:
```ts
@NgModule({
  imports: [
    HttpClientModule
  ]

  ...
})
export class AppModule {}
```

2. Inject the `HttpClient` into your `AppComponent`:

```ts
export class AppComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

...

}
```

3. Add an output binding for the submit event to your `<form>`:
```html
<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
```

4. In `onSubmit()` send a `POST` request to the server via `HttpClient` and add some error handling to the response `Observable`:
```ts
response$: Observable<any>;

onSubmit() {
  const url = 'http://127.0.0.1:3333/api/users/';

  this.response$ = this.httpClient.post(url, this.formGroup.value).pipe(
    catchError(error => of(`Error: ${JSON.stringify(error, null, 2)}`))
  );

  this.formGroup.reset();
}
```

5. Optionally add some debug output to the markup via `AsyncPipe`:
```html
  ...

  <div *ngIf="response$ | async as response" class="form-group">

    <div class="col-sm-12">
        <pre>{{ response }}</pre>
    </div>

  </div>

</form>
```


## 5 [BACKEND] - Email Validation

1. Install `class-validator` and `class-transformer` dependencies:
```
npm i class-validator 
npm i class-transformer
```

2. Bind a global `ValidationPipe` to protect the application from incorrect data:
```ts
app.useGlobalPipes(new ValidationPipe());
```

3. Add the `IsEmail` class validator decorator to the corresponding `CreateUserDto` field:
```ts
import { IsEmail } from 'class-validator';

export class CreateUserDto {

  firstName: string;

  lastName: string;

  @IsEmail()
  email: string;
}
```

## 6 [FRONTEND] - Email Validation

1. Add the built-in email `ValidatorFn` to the corresponding `FormGroup` field: 
```ts
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

...

ngOnInit() {
  this.formGroup = this.formBuilder.group({
    firstName: null,
    lastName: null,
    email: [null, [Validators.required, Validators.email]]
  });
}
```

2. Disable the submit button if the form is invalid:
```html
<button type="submit" class="btn btn-primary" [disabled]="!formGroup.valid">Send</button>
```

3. Add a validation message for the email form field:
```html
<div class="form-group">

  <label for="email" class="col-sm-12 control-label">E-Mail</label>
  <div class="col-sm-12">
    <input type="text" class="form-control" id="email" placeholder="E-Mail" formControlName="email"
           [ngClass]="{'is-invalid': formGroup.get('email').invalid && formGroup.get('email').touched}">
    <p *ngIf="formGroup.get('email').invalid && formGroup.get('email').touched" class="invalid-feedback">Field is not valid</p>
  </div>

</div>
```

## 7A [LIBRARY] - Nx Library Setup

Create the library project shared between frontend and backend:
```
ng g @nrwl/workspace:library validation
```

## 7B [LIBRARY] - Custom Validator Function

Add the pure validator function to `validators.ts`:
```ts
export function isForbidden(value: string, forbiddenValue: string): boolean {
  return typeof value === "string" ? value.toLowerCase().includes(forbiddenValue.toLowerCase()) : false;
}
```

## 8A [LIBRARY] - Custom Class Validator

1. Implement a `ConstraintValidatorInterface` in `class-validator/validators.ts`:
```ts
@ValidatorConstraint()
export class IsForbiddenConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [forbiddenValue] = args.constraints;

    return !isForbidden(value, forbiddenValue);
  }
}
```

2. Register a class validator decorator in `class-validator/validators.ts`:
```ts
export function IsForbidden(forbiddenValue: string, validationOptions?: ValidationOptions) {

  return (object: Object, propertyName: string) => {

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [forbiddenValue],
      validator: IsForbiddenConstraint
    });
  };
}
```

3. Export the class validator for external usage from `ìndex.ts`:
```ts
export * from './lib/class-validator/validators';
```


## 8B [BACKEND] - Custom Validation

Apply the class validator decorator to your `CreateUserDto`:
```ts
import { IsEmail } from 'class-validator';
import { IsForbidden } from '@fullstack-typescript-workshop/validation';

export class CreateUserDto {
  firstName: string;
  
  @IsForbidden('test')
  lastName: string;

  @IsEmail()
  email: string;
}
```

## 9A [LIBRARY] - Custom Angular Validator

1. Create a `ValidatorFn` factory function `forbiddenValidator` in `angular/validators.ts`:
```ts
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
```

2. Optionally create a `ForbiddenValidatorDirective` to make the `forbiddenValidator` work with template-driven forms:
```ts
@Directive({
  selector: '[forbidden][ngModel], [forbidden][formControlName]',
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
```

3. Create an `ExistingProvider` for the validator directive and provide it via the directive's `providers`:
```ts
export const FORBIDDEN_VALIDATOR_PROVIDER: ExistingProvider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ForbiddenValidatorDirective),
  multi: true
};

@Directive({
  selector: '[forbidden][ngModel], [forbidden][formControlName]',
  providers: [FORBIDDEN_VALIDATOR_PROVIDER]
})
```

4. Optionally create a `ValidationModule` for convenient import:
```ts
import { NgModule } from '@angular/core';
import { ForbiddenValidatorDirective } from './validators';

@NgModule({
  declarations: [ForbiddenValidatorDirective]
})
export class ValidationModule {}
```

5. Export the Angular validator and module for external usage from `ìndex.ts`:
```ts
export * from './lib/angular/validators';
export * from './lib/angular/validation.module';
```

## 9B [FRONTEND] - Custom Angular Validation

1. Apply the `forbiddenValidator` to the form control in the frontend:
```ts
this.formGroup = this.formBuilder.group({
  firstName: null,
  lastName: [null, forbiddenValidator('test')],
  email: [null, [Validators.required, Validators.email]]
});
```

2. Add a getter for checking if the form control is invalid:
```ts
get isLastNameForbidden() {
  return this.formGroup.get('lastName').hasError('forbidden') && this.formGroup.get('lastName').touched;
}
```

3. Add markup for validation output to the template:
```html
<div class="form-group">

  <label for="lastName" class="col-sm-12 control-label">Last Name</label>
  <div class="col-sm-12">
    <input type="text" class="form-control" id="lastName" formControlName="lastName" placeholder="Last Name"
           [ngClass]="{'is-invalid': isLastNameForbidden}">
    <p *ngIf="isLastNameForbidden" class="invalid-feedback">Last name is forbidden</p>
  </div>

</div>
```
