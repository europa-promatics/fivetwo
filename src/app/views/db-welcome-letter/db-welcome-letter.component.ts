import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import  * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-db-welcome-letter',
  templateUrl: './db-welcome-letter.component.html',
  styleUrls: ['./db-welcome-letter.component.scss']
})
export class DbWelcomeLetterComponent implements OnInit {
  investor: any;
  investor_id: string;
  DisclosureName: string;

  constructor(private route: ActivatedRoute, private _location: Location,private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getInvestor()
  }

  getInvestor(){
  	// var investor_data = JSON.parse(sessionStorage.getItem('investor'))

  	// if (investor_data!=null) {
    //       this.investor=investor_data
    //       this.DisclosureName = investor_data.LastName + " "+investor_data.FirstName
    //     //   this.DisclosureName = investor_data.LastName
  	// 	this.investor_id = investor_data.id
  		
  	// 	console.log(this.investor)
  		
    //   }
      
      var ob = {
        id: atob(this.route.snapshot.params.investor_id),
      };
      console.log(ob)
      this.authService.singleInvestor(ob).subscribe(data => {
  
        if (data.success) {
            this.investor = data.data
            this.investor_id=atob(this.route.snapshot.params.investor_id)
            this.DisclosureName = this.investor.LastName + " "+this.investor.FirstName
            // this.chosenItem = this.investor.RecordAdviceOfAdvisorTaken
            // this.Year1 = this.investor.Year1;
            // this.Year2 = this.investor.Year2;
            // this.Year3 = this.investor.Year3;
            // this.Year4 = this.investor.Year4;
            // this.Year5 = this.investor.Year5;
            // this.Year6 = this.investor.Year6;
            // this.getYearTotal()
        }
      }, err => {
        console.log(err)
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
