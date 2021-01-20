import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from "./../../auth/auth.service";
import * as currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  years
  monthly
  investors
  monthNgModule = {};
  currentYear = moment().format("YYYY")
  constructor(private service : AuthService) { }

  ngOnInit() {
    // alert(moment());
    // this.getYearlyInvestor()
    this.getMonthlyInvestor(moment())
  }

  getTotalNoOfProducts(ele){
    var totalHolding = 0;
    var TempDeal = [];
    var totalProduct = 0;
    ele.forEach((element,ind) => {
      if(ind == 0){
        TempDeal.push(element.deal_reference);
        if(element.investor_clients_deal_single){ //make sure deal is active or inactive // if null then deal is not active
          ++totalProduct;
        }
      }else{
        if(TempDeal.indexOf(element.deal_reference) == -1){
          console.log("Im here -> "+element.deal_reference);
          if(element.investor_clients_deal_single){ //make sure deal is active or inactive // if null then deal is not active
            ++totalProduct;
          }
          element.investor_clients_dailyBalance.forEach(balance => {
            totalHolding = totalHolding + balance.net_amount
          });
        }
      }
    });

    return totalProduct

  }

  formatAmount(amount){

    return currencyFormatter.format(amount, { code: 'ZAR',symbol: '', })

  }

  getTotalHolding(ele){
    var totalHolding = 0;
    var TempDeal = [];
    ele.forEach((element,ind) => {
        if(ind == 0){
          TempDeal.push(element.deal_reference);
          element.investor_clients_dailyBalance.forEach(balance => {
            totalHolding = totalHolding + balance.net_amount
          });
        }else{
          if(TempDeal.indexOf(element.deal_reference) == -1){
            console.log("Im here -> "+element.deal_reference);

            element.investor_clients_dailyBalance.forEach(balance => {
              totalHolding = totalHolding + balance.net_amount
            });
          }
        }
    });


    // try{
    //   ele.map((val) => {
    //     totalHolding = totalHolding + val.investor_clients_dailyBalance
    //     .map(item => item.net_amount)
    //     .reduce((prev, curr) => prev + curr, 0);
    //   })   
    // }catch(err){
    //   return totalHolding
    // }
    
    return totalHolding.toFixed(2);
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
  formatMonth(date){
    return moment(date).format('MMMM');
  }

  getMonthlyInvestor(date){
    var obj = {
      date : date
    }
    this.service.getMonthlyInvestor(obj).subscribe( res => {
      if(res.success){
        // this.monthly = res.investor_monthly;
        this.monthly = res.monthNames;

        this.monthly.forEach(element => {
            this.monthNgModule[element] = {
              checked : "no"
            }
        });

      }
        
    },err => {
      this.service.showAuthError(err);
    })
  }
  getReviewsClient(date){
    var obj = {
      date : date
    }
    this.service.getReviewsClient(obj).subscribe( res => {
      if(res.success){
        this.investors = res.data;
      }
        
    },err => {
      this.service.showAuthError(err);
    })
  }

  setAll(event){
    console.log(event);
  }




}
