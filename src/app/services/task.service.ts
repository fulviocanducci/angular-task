import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Task from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  url = environment.url + 'tasks';
  constructor(private httpClient: HttpClient) {}
  getTasks(): Observable<Array<Task>> {
    return this.httpClient
      .get<Array<Task>>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }
  getTask(id: number): Observable<Task> {
    return this.httpClient
      .get<Task>(`${this.url}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
  putTask(task: Task): Observable<Task> {
    return this.httpClient
      .put<Task>(`${this.url}/${task.id}`, task)
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteTask(id: number): Observable<Task> {
    return this.httpClient
      .delete<Task>(`${this.url}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
  postTask(task: Task): Observable<Task> {
    return this.httpClient
      .post<Task>(`${this.url}`, task)
      .pipe(retry(2), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
