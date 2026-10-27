import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Comment } from '../../classes/comment/comment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = 'https://us-central1-paradise-chefs-47fe0.cloudfunctions.net/api';

  constructor(
    private http: HttpClient
  ) { }

  getComments(): Observable<Comment[]> {
    //TODO: this json must be stringified.
    return this.http.get<Comment[]>(`${this.commentUrl}/getComments`)
  }
}
