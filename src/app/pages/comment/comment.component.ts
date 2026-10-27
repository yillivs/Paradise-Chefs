import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { NewReview, Review } from '../../core/classes/review/review';
import { ReviewService } from '../../core/services/review/review.service';

interface Testimonial {
  /** Translation key for the label; the quote itself is a guest's own words. */
  labelKey: string;
  quote: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  featured: Testimonial = {
    labelKey: 'testimonials.labels.vacation',
    quote: 'Desiree and her team\'s cooking was the highlight of our vacation. ' +
      'We just relaxed and enjoyed all the spectacular dishes that they prepared with love.'
  };

  testimonials: Testimonial[] = [
    {
      labelKey: 'testimonials.labels.family',
      quote: 'We were thrilled when Chef Desiree was able to fit cooking for our large family into her busy holiday season. ' +
        'We have never had more delicious or beautifully looking meals! ' +
        'Her knowledge of where to procure and how to prepare local fish, fruits, and vegetables was awesome. ' +
        'We are looking forward to enjoying her interesting and delicious meals on our next trip to Costa Rica.'
    },
    {
      labelKey: 'testimonials.labels.events',
      quote: 'Whether it\'s cooking for an intimate dinner for two or for one hundred guests at a big wedding, ' +
        'Chef Desiree is quite famous here in Costa Rica for successfully combining interesting flavors and styles of cooking. ' +
        'She uses her Vietnamese and French heritage mixed with the local Latin ingredients to prepare exotic dishes ' +
        'in a \'Pura Vida\' atmosphere. Her Asian chicken wings are simply the best ever!'
    },
    {
      labelKey: 'testimonials.labels.wedding',
      quote: 'My husband and I chose Desiree to do the catering for our wedding in January 2023 and we were delighted with the results. ' +
        'She is both very experienced and highly imaginative, which made the planning so easy and stress free. ' +
        'On the big day Desiree and her team performed flawlessly. We were thrilled with the food, as were all the guests. ' +
        'All the feedback was very positive. Very highly recommended.'
    }
  ];

  reviews: Review[] = [];
  stars = [1, 2, 3, 4, 5];

  form: NewReview = this.emptyForm();
  submitted = false;
  status: 'idle' | 'sending' | 'sent' | 'error' = 'idle';
  /** A message from the server, or empty to show the generic translated one. */
  errorMessage = '';

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewService.getReviews().subscribe({
      next: reviews => this.reviews = reviews,
      // The page works without guest reviews, so a failed load just hides them.
      error: () => this.reviews = []
    });
  }

  setRating(rating: number) {
    this.form.rating = rating;
  }

  submit(reviewForm: NgForm) {
    this.submitted = true;
    if (reviewForm.invalid || this.form.rating < 1) {
      return;
    }

    this.status = 'sending';
    this.errorMessage = '';
    this.reviewService.submitReview(this.form).subscribe({
      next: () => {
        this.status = 'sent';
        this.submitted = false;
        this.form = this.emptyForm();
        reviewForm.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        this.status = 'error';
        this.errorMessage = error.error?.error || '';
      }
    });
  }

  private emptyForm(): NewReview {
    return { name: '', rating: 0, comment: '', website: '' };
  }
}
