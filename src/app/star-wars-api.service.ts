import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Character } from './character.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarWarsApiService {

  private BASE_URL = 'https://swapi.dev/api/people/?page=';

  constructor(private httpClient: HttpClient) { }

  public getCharacters(page = 1): Observable<Character[]> {
    return this.httpClient
      .get<Character[]>(`${this.BASE_URL}${page}`)
      .pipe(
        map(resp => resp[`results`]),
        catchError(this.handleError)
      );
  }

  public getCharacterDetails(url: string): Observable<Character> {
    return this.httpClient
      .get<Character>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
