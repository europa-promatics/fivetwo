import { Component, OnInit } from '@angular/core';
const moment = require('moment');

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    alert(moment());
  }

}
