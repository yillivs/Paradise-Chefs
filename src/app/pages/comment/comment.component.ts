import { Component, OnInit } from '@angular/core';

import { Comment } from '../../core/classes/comment/comment';
import { CommentService } from '../../core/services/comment/comment.service';

interface Testimonial {
  label: string;
  quote: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  featured: Testimonial = {
    label: 'A vacation in Costa Rica',
    quote: 'Desiree and her team\'s cooking was the highlight of our vacation. ' +
      'We just relaxed and enjoyed all the spectacular dishes that they prepared with love.'
  };

  testimonials: Testimonial[] = [
    {
      label: 'A family holiday',
      quote: 'We were thrilled when Chef Desiree was able to fit cooking for our large family into her busy holiday season. ' +
        'We have never had more delicious or beautifully looking meals! ' +
        'Her knowledge of where to procure and how to prepare local fish, fruits, and vegetables was awesome. ' +
        'We are looking forward to enjoying her interesting and delicious meals on our next trip to Costa Rica.'
    },
    {
      label: 'Events of every size',
      quote: 'Whether it\'s cooking for an intimate dinner for two or for one hundred guests at a big wedding, ' +
        'Chef Desiree is quite famous here in Costa Rica for successfully combining interesting flavors and styles of cooking. ' +
        'She uses her Vietnamese and French heritage mixed with the local Latin ingredients to prepare exotic dishes ' +
        'in a \'Pura Vida\' atmosphere. Her Asian chicken wings are simply the best ever!'
    },
    {
      label: 'A wedding in January 2023',
      quote: 'My husband and I chose Desiree to do the catering for our wedding in January 2023 and we were delighted with the results. ' +
        'She is both very experienced and highly imaginative, which made the planning so easy and stress free. ' +
        'On the big day Desiree and her team performed flawlessly. We were thrilled with the food, as were all the guests. ' +
        'All the feedback was very positive. Very highly recommended.'
    }
  ];

   constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

}
