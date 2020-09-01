import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forbiddenValidator } from '@fullstack-typescript-workshop/validation';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'fullstack-typescript-workshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  formGroup: FormGroup;
  response$: Observable<any>;

  constructor(private readonly formBuilder: FormBuilder, private readonly httpClient: HttpClient) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      firstName: null,
      lastName: [null, forbiddenValidator('test')],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const url = 'http://127.0.0.1:3333/api/users/';

    this.response$ = this.httpClient.post(url, this.formGroup.value).pipe(
      catchError(error => of(`Error: ${JSON.stringify(error, null, 2)}`))
    );

    this.formGroup.reset();
  }
}
