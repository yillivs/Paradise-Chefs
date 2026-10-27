export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface NewReview {
  name: string;
  rating: number;
  comment: string;
  /** Honeypot: real visitors never fill this in. */
  website: string;
}
