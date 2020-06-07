import { Component, OnInit } from '@angular/core';

import { Comment } from '../../core/classes/comment/comment';
import { CommentService } from '../../core/services/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  model: Comment;
  submitted = false;
  comments;

   constructor(private commentService: CommentService) { }
  
   add(newComment: Comment): void {
      if(!newComment) {return;}
      this.commentService.addComment(newComment)
      .subscribe(comment => {
        this.comments.push(comment);
      });
  }
  
  ngOnInit() {
    this.model = new Comment('','');
    this.comments = this.commentService.getComments();
  }

}
