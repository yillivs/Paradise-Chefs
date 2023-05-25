import { Component, OnInit } from '@angular/core';

import { Comment } from '../../core/classes/comment/comment';
import { CommentService } from '../../core/services/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

   constructor(private commentService: CommentService) { }
  
  ngOnInit() {
  }

}
