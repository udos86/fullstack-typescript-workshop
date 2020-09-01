import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
      lastName: null,
      email: null
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
