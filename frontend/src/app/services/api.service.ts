import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/conf/environment';
import { apiEndpoints } from './apiEndpoints'


@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = environment.apiURL

  constructor(private http: HttpClient) { }

  get<T>(endpoint: apiEndpoints): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: apiEndpoints, data :any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Erreur côté client :', error.error.message);
    } else {
      console.error(`Erreur serveur (${error.status}): ${error.message}`);
    }

    return throwError(() => new Error('Une erreur réseau est survenue. Veuillez réessayer plus tard.'));
  }

}
