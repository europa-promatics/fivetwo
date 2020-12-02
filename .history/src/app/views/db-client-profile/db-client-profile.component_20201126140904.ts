import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';

import * as moment from 'moment';
import * as currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-db-client-profile',
  templateUrl: './db-client-profile.component.html',
  styleUrls: ['./db-client-profile.component.scss']
})

export class DbClientProfileComponent implements OnInit {
	investor
	investor_data
	Note
  authService
  client_data
  in_arr
  totalBalance=0;
  last_date
  deals = []

  constructor(private route: ActivatedRoute,private service:AuthService,private router:Router,private toastr: ToastrService) {
      this.authService = service;
   }

  ngOnInit() {
    this.client_data = {};
    // alert(currencyFormatter.format(1000000, { code: 'ZAR' }))
  	this.getInvestor()
  }

  getBalance(ref_number){
    var d = _.where(this.client_data.dailyBalance, {"Deal Reference": ref_number});
    console.log(d);
    if(d && d.length){
        return d[0]['Net Amount']
    }else{
      return 0;
    }
      // alert('d');
  }
  getIncomeDetail(ref_number){
    var d = _.where(this.client_data.incomeDetails, {"Deal Reference": ref_number});
    // console.log(d);
    if(d && d.length){
        return `${d[0]['StatusFlag']} ${d[0]['Gross Income']} = ${d[0]['Income Rate']}% (${d[0]['Income Frequency']})`
    }else{
      return "------------";
    }
      // alert('d');
  }

  calculateTotal(dailyBalance){
      var totalBalanceTemp = 0;
      dailyBalance.map((item) => {
        // console.log(item.net_amount, "------------> met amount" )
        totalBalanceTemp = totalBalanceTemp + item.net_amount;

        this.last_date = moment(item.balance_date).format("DD MMM YYYY")


      })
      // all total balance
      console.log(this.totalBalance);
      // this.totalBalance = this.totalBalance + totalBalanceTemp;
      return totalBalanceTemp.toFixed(2);
  }
  calculateTotalProduct(dailyBalance){
      var totalBalanceTemp = 0;
      dailyBalance.map((item) => {
        // console.log(item.net_amount, "------------> met amount" )
        totalBalanceTemp = totalBalanceTemp + item.net_amount;

      })
      
      return totalBalanceTemp.toFixed(2);
  }

  getPercentage(amount,total_amount){
		if(amount > 0){
			return Math.round(amount / total_amount * 100)
		}else{
			return 0;
		}
  }

  formatAmount(amount){

    return currencyFormatter.format(amount, { code: 'ZAR',symbol: '', })

  }

  showYear(obj){

    if(obj.year_wise_data){

       if(obj.year_wise_data.type == "year1"){
        return "Year 1"
        
      }else if(obj.year_wise_data.type == "year2"){
        return "Year 2"
      
      }else if(obj.year_wise_data.type == "year3"){
        return "Year 3"
      
      }else if(obj.year_wise_data.type == "year4"){
        return "Year 4"
      
      }else if(obj.year_wise_data.type == "year5"){
        return "Year 5"
      }
      
      else if(obj.year_wise_data.type == "year6"){
        return "Year 6"
      } 

      else {
        return "-";
      }

    }else{
      return "--"
    }

  }
  
  replaceNameFiveTwo(name){
    //console.log(name,"------------< Name >---------- ")
		return name.replace(/Ninety One/g, '');
	}

  

  getInvestor(){
  	var investor_data = JSON.parse(sessionStorage.getItem('investor'))

    var ob = {
      client_id: this.route.snapshot.params.client_id,
    };
    console.log(ob)
    this.authService.clientProfile(ob).subscribe(data => {

      if (data) {
		this.investor_data = data.investor;
		  
        console.log(data)
        this.client_data = data;
        this.in_arr = data.incim;
        this.in_arr.forEach((val,ind)=>{
			if(this.deals.indexOf(val.deal_reference) == -1){
				val.investor_deals.dealAttribute_balance.forEach((val2,ind2) => {


						this.totalBalance = this.totalBalance + val2.net_amount;
						this.deals.push(val.deal_reference)

				})
			}
            //this.totalBalance = this.totalBalance + val.income_details_daily_balance.net_amount;
        })

      }
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

  	if (investor_data!=null) {
  		this.investor=investor_data
  		console.log(this.investor)

  	}
  }

  plusClick(type){

    // console.log(type)

    if (type=='id') {
      console.log(type)
      this.router.navigate(['/user/dbAddId']);

    }else if(type=='disclosure'){
      console.log(type)

      this.router.navigate(['/user/dbAddDisclosure']);

    }else if(type=='record_advice'){
      console.log(type)

      this.router.navigate(['/user/dbAddRecordAdvice']);

    }else if(type=='risk_profiler'){
      console.log(type)

      this.router.navigate(['/user/dbAddRiskProfiler']);

    }else if(type=='broker_appointment'){
      console.log(type)

      this.router.navigate(['/user/brokerAppointment']);


    }else if(type=='letter_authority'){

    }

  }

  saveNotes(user_id){
    if(this.investor.Note){
      var obj = {
        user_id : user_id,
        notes : this.investor.Note,
      }

      console.log(obj)

      this.authService.saveNotes(obj).subscribe(data => {

        if (data) {
          
  
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
        //this.toastr.error(err.message);
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
    }
  }

}
