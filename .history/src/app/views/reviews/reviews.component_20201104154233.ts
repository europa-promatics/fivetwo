import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from "./../../auth/auth.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  years
  constructor(private service : AuthService) { }

  ngOnInit() {
    // alert(moment());
    this.getYearlyInvestor()
  }

  getYearlyInvestor(){

    this.service.getYearlyInvestor().subscribe(res => {
      this.years = res.investor_yearly;
      console.log(res)
    },err => {
      console.log(err)
      this.service.showAuthError(err);
    })

  }

  formatYear(date){
    return moment(date).format('YYYY');
  }

  getMonthlyInvestor(date){
    var obj = {
      date : date
    }
    this.service.getMonthlyInvestor(obj).subscribe( res => {

    },err => {
      this.service.showAuthError(err);
    })
  }




}
