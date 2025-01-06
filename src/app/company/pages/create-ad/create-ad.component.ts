import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationComponent, NzNotificationService } from 'ng-zorro-antd/notification';
import { CompanyService } from '../../../company/services/company.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-ad',
  standalone: false,
  
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.scss'
})

export class CreateAdComponent {

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  validateForm!:FormGroup;

  constructor(private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router,
    private companyService: CompanyService){}
  
    ngOnInit(){
      this.validateForm=this.fb.group({
        serviceName:[null,[Validators.required]],
        description:[null,[Validators.required]],
        price:[null,[Validators.required]],
      })
    }

    onFileSelected(event:any){
      this.selectedFile=event.target.files[0];
      this.previewImage();
    }
    previewImage(){
      const reader=new FileReader();
      reader.onload=() =>{
        this.imagePreview=reader.result; 
      }
      reader.readAsDataURL(this.selectedFile);
    }

    postAd(){
      const formData:FormData=new FormData();
      formData.append('img',this.selectedFile);
      formData.append('serviceName',this.validateForm.get('serviceName').value);
      formData.append('description',this.validateForm.get('description').value);
      const price = this.validateForm.get('price').value;
      // formData.append('price',this.validateForm.get('price').value);
      formData.append('price', price ? String(Number(price)) : '0');

      this.companyService.postad(formData).subscribe(res =>{
        this.notification.success(
          'SUCCESS',
          'Ad posted Succesfully!',
          {nzDuration: 5000}
        );
        this.router.navigateByUrl('/company/ads');
      },error =>{
        this.notification.error(
          'ERROR',
          `${error.error}`,
          {nzDuration: 5000}
        )
      })

    }

}




