import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from "./../../auth/auth.service";
import * as currencyFormatter from 'currency-formatter';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  years
  monthly
  monthlyStatic
  investors
  monthNgModule = {};
  currentMoveOpen
  option="FirstName"
  search
  select_month
  length
  limit
  offset
  date
  isSearched = false
  currentYear = moment().format("YYYY")
  constructor(private service : AuthService,private toastr: ToastrService) { }

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
          // console.log("Im here -> "+element.deal_reference);
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
            // console.log("Im here -> "+element.deal_reference);

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

  getMonthlyInvestor(date,search="",col=""){
    var obj = {
      date : date,
      search : search,
      col : col,
    }
    this.service.getMonthlyInvestor(obj).subscribe( res => {
      if(res.success){
        // this.monthly = res.investor_monthly;
        this.monthly = res.monthNames;
        this.monthlyStatic = res.allMonth;
        this.monthly.forEach(element => {
            this.monthNgModule[element] = {
              checked : "no",
              ids : [],
              loader : false,
              check : {},
            }
        });

      }
        
    },err => {
      this.service.showAuthError(err);
    })
  }
  getReviewsClient(date){
    this.limit = 10;
    this.offset = 0;
    var obj = {
      date : date,
      limit : this.limit,
      offset : this.offset,
      search : this.search,
      col : this.option,
      isSearched : this.isSearched
    }
    this.date = date
    
    this.monthNgModule[date].loader = true;
    console.log(this.monthNgModule[date])
    this.service.getReviewsClient(obj).subscribe( res => {
      if(res.success){
        this.investors = res.data;
        this.length = res.count;
      }
     this.monthNgModule[date].loader = false;
    },err => {
     this.monthNgModule[date].loader = false;
      this.service.showAuthError(err);
    })
  }

  setAll(month,id,event){
      console.log(event);
      if(event.checked){
        this.monthNgModule[month].ids.push(id); //push
      }else{
        //pop
        const index: number = this.monthNgModule[month].ids.indexOf(id);
        if (index !== -1) {
          this.monthNgModule[month].ids.splice(index, 1);
        }
      }

      // console.log(this.monthNgModule);
  }

  paginationOptionChange(evt) {
    console.log(evt)
    this.offset = (evt.pageIndex * evt.pageSize).toString()
    this.limit = evt.pageSize
    var obj = {
      date : this.date,
      offset : this.offset,
      limit : this.limit, 
      search : this.search,
      col : this.option,
    }
    this.investors = [];
    this.date = this.date
    this.monthNgModule[this.date].loader = true;
    console.log(this.monthNgModule[this.date])
    this.service.getReviewsClient(obj).subscribe( res => {
      if(res.success){
        this.investors = res.data;
        this.length = res.count;
      }
     this.monthNgModule[this.date].loader = false;
    },err => {
     this.monthNgModule[this.date].loader = false;
      this.service.showAuthError(err);
    })    

  }

  moveModelOpen(item){
    this.currentMoveOpen = item;
  }

  changeMove(item,event){

    this.select_month = item;

  }

  moveInvestor(){
    if(this.monthNgModule[this.currentMoveOpen].ids.length){
      // alert("Success")

      var obj = {
        move_to_month : this.currentMoveOpen,
        select_month_to : this.select_month,
        ids : this.monthNgModule[this.currentMoveOpen].ids,
      }
      this.service.moveClient(obj).subscribe( res => {
        if(res.success){
          this.toastr.success("Users moved successfully.", 'Success');
          // this.investors = res.data;
          this.monthly = []; 
          this.ngOnInit();
        }
          
      },err => {
        this.service.showAuthError(err);
      })

    }else{
      this.toastr.error("Please choose any user to move", 'Error');
    }

    console.log(this.monthNgModule[this.currentMoveOpen].ids);
  }

  selectAll(item,event){
    // alert("dd");
    console.log(event);
    // console.log(this.monthNgModule[item]);

    

    if(event.checked){   
      this.investors.forEach(element => {

        this.monthNgModule[item].ids.push(element.id)
        this.monthNgModule[item].check[element.ClientNumber] = true;
      });   
      console.log(this.monthNgModule[item]);
    }else{
      this.investors.forEach(element => {

        this.monthNgModule[item].ids = []
        this.monthNgModule[item].check[element.ClientNumber] = false;
      });
    }
  }

  getSearch(){
    if(this.search && this.option){
      this.isSearched = true;
      this.getMonthlyInvestor(moment(),this.search,this.option);
    }

  }




}
