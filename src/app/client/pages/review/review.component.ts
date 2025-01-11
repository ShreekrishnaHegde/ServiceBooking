import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientService } from '../../services/client.service';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';


@Component({
  selector: 'app-review',
  standalone: false,
  
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  // bookId:number=this.activatedRoute.snapshot.params['id'];
  bookId:number;
  validateForm!:FormGroup;
  ngOnInit(){
    this.validateForm=this.fb.group({
      rating :[null,[Validators.required]],
      review :[null,[Validators.required]],
    });
    this.bookId=this.activatedRoute.snapshot.params['id'];
  }

  giveReview(){
    const reviewDto={
      rating : this.validateForm.get("rating").value,
      review : this.validateForm.get("review").value,
      userId: UserStorageService.getUserId(),
      bookId: this.bookId
    }
    this.clientService.giveReview(reviewDto).subscribe(res=>{
       this.notification.success(
        'SUCCESS',
        `Review posted successfully`,
        {nzDuration: 5000}
       );
       this.router.navigateByUrl("/client/bookings")
    },error=>{
       this.notification.error(
        'ERROR',
        `${error.message}`,
        {nzDuration: 5000}
       )
    })
  }
  constructor(
      private fb:FormBuilder,
      private notification: NzNotificationService,
      private router:Router,
      private clientService:ClientService,
      private activatedRoute: ActivatedRoute,
  ){}

}
