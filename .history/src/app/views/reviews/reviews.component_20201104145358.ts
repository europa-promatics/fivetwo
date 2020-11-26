import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from "./../../auth/auth.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor(private service : AuthService) { }

  ngOnInit() {
    // alert(moment());
  }

  getYearlyInvestor(){

    this.service.getYearlyInvestor().subscribe(res => {
      console.log(res)
    },err => {

    })

  }




}
