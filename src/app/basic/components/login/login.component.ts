import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';
import { Route, Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  validateForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,
  ){}

  ngOnInit(){
    this.validateForm=this.fb.group({
      userName:[null,[Validators.required]],
      password:[null,[Validators.required]]

    })
  }

  // submitForm(){
  //   this.authService.login(this.validateForm.get(['userName'])!.value,this.validateForm.get(['password'])!.value)
  //   .subscribe(res=>{
  //     console.log(res);
  //   },error=>{
  //     this.notification.error(
  //       'ERROR',
  //       `BAD CREDENTIALS`,
  //       {nzDuration: 5000}
  //     )
  //   });
  // }
  submitForm() {
    if (this.validateForm.valid) {
      const userName = this.validateForm.get('userName')?.value;
      const password = this.validateForm.get('password')?.value;
  
      this.authService.login(userName,password).subscribe(
        res => {
          console.log(res);
          if(UserStorageService.isClientLoggedIn()){
            this.router.navigateByUrl('client/dashboard');
          }
          else if(UserStorageService.isCompanyLoggedIn()){
            this.router.navigateByUrl('company/dashboard');
          }
        },
        error => {
          this.notification.error(
            'ERROR',
            'BAD CREDENTIALS',
            { nzDuration: 5000 }
          );
        }
      );
    } else {
      this.notification.error(
        'ERROR',
        'Form is invalid',
        { nzDuration: 5000 }
      );
    }
  }
  

}
