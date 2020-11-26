import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-db-broker-client-profile',
  templateUrl: './db-broker-client-profile.component.html',
  styleUrls: ['./db-broker-client-profile.component.scss']
})
export class DbBrokerClientProfileComponent implements OnInit {
	investor
  click_investor
  constructor() { }

  ngOnInit() {
  	this.getInvestor()
  }
  getInvestor(){
  	var investor_data = JSON.parse(sessionStorage.getItem('investor'))
  	this.investor=investor_data
  	console.log(this.investor)

    var click_investor_data = JSON.parse(sessionStorage.getItem('click_investor'))
    if (click_investor_data!=null) {      
      this.click_investor=click_investor_data
    }
  }

}
