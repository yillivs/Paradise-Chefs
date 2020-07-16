import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../../classes/comment/comment';
import { Observable } from 'rxjs/internal/Observable';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = 'https://us-central1-paradise-chefs-47fe0.cloudfunctions.net/comments';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( 
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`CommentService: ${message}`);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentUrl}/getComments`)
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentUrl}/postComments`, comment, this.httpOptions).pipe(
      tap((newComment: Comment) => this.log(`added comment =${newComment}`)),
      catchError(this.handleError<Comment>('addComment'))
    );

  }
}
