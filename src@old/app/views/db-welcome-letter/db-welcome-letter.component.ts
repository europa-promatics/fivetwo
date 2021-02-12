import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

import * as moment from 'moment';
import * as currencyFormatter from 'currency-formatter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-db-welcome-letter',
  templateUrl: './db-welcome-letter.component.html',
  styleUrls: ['./db-welcome-letter.component.scss']
})
export class DbWelcomeLetterComponent implements OnInit {
  investor: any;
  investor_id: string;
  DisclosureName: string;
  products
  totalBalance=0;
  totalClientValue = []
  current_date = moment().format("YYYY-MM-DD")
  send_letter_message = "Send Welcome Letter"
  

  constructor(private route: ActivatedRoute, private _location: Location,private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getInvestor()
    this.clientProducts();
    // this.getTotalValue();
  }

  formatAmount(amount){

    return currencyFormatter.format(amount, { code: 'ZAR',symbol: '', })

  }

  getInvestor(){ 
      var ob = {
        id: atob(this.route.snapshot.params.investor_id),
      };
      console.log(ob)
      this.authService.singleInvestor(ob).subscribe(data => {
  
        if (data.success) {
            this.investor = data.data
            this.getTotalValue(data.data.ClientNumber)
            this.investor_id=atob(this.route.snapshot.params.investor_id)
            this.DisclosureName = this.investor.LastName + " "+this.investor.FirstName           
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
        //this.toastr.error(err.message);
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
  }
  clientProducts(){ 
      var ob = {
        id: atob(this.route.snapshot.params.investor_id),
      };
      console.log(ob)
      this.authService.clientProducts(ob).subscribe(data => {
        
        if(data.success == 1){
          this.products = data.products;
        }
        
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
        //this.toastr.error(err.message);
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
  }

  getPercentageTotalValue(amount){
		if(amount > 0){
			return Math.round(amount / this.totalBalance * 100)
		}else{
			return 0;
		}
  }

  getTotalValue(client_id){
    // alert(this.investor_DD);
    var obj = {
      client_id : client_id
    }
    this.authService.getTotalValue(obj).subscribe(data => {
      //console.log(data);
        if(data.success){

          



          // console.log(this.investor)
          data.deals.forEach((element,ind) => {
            
            this.totalBalance += element.totalAmount

          });

          this.totalClientValue = data.deals;
          console.log(this.totalClientValue);


        }else{
          this.toastr.error(data.message);
        }

    },err => {
      this.authService.showAuthError(err);
    })


  }

  sendWelcomeLetter(){
    var ob = {
      id: atob(this.route.snapshot.params.investor_id),
      client_id : this.investor.ClientNumber
    };

    this.send_letter_message = "sending..."
    console.log(ob)
    this.authService.sendWelcomeLetter(ob).subscribe(data => {
      
      if(data.success == 1){
        window.open(environment.welcome_letter+""+data.pdfName)
      }

      this.send_letter_message = "Send Welcome Letter"
      
    }, err => {
      console.log(err)
      this.send_letter_message = "Send Welcome Letter"
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }

  goBack(){
    this._location.back();
  }

}
