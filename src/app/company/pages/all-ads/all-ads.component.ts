import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-all-ads',
  standalone: false,
  
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss'
})
export class AllAdsComponent {
  ads: any;
  constructor(private companyService: CompanyService){}

  
  getAllAdsByUderId(){
    this.companyService.getAllAdsByUserId().subscribe(res =>{
      this.ads=res;

    })
  }

  ngOnInit(){
    this.getAllAdsByUderId();
  }
  updateImg(img){
    return 'data:image/jpeg;base64,'+img;
  }
}
