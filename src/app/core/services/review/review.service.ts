import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NewReview, Review } from '../../classes/review/review';

interface ReviewRow {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewsUrl = '/api/reviews';

  constructor(private http: HttpClient) { }

  /** Approved reviews, newest first. */
  getReviews(): Observable<Review[]> {
    return this.http.get<ReviewRow[]>(this.reviewsUrl).pipe(
      map(rows => rows.map(row => ({
        id: row.id,
        name: row.name,
        rating: row.rating,
        comment: row.comment,
        // D1 stores UTC as "YYYY-MM-DD HH:MM:SS"
        createdAt: new Date(row.created_at.replace(' ', 'T') + 'Z')
      })))
    );
  }

  /** Saved unapproved; it shows up once it has been approved. */
  submitReview(review: NewReview): Observable<void> {
    return this.http.post(this.reviewsUrl, review).pipe(map(() => undefined));
  }
}
