import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../.././auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

import * as currencyFormatter from 'currency-formatter';
import Swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-draft-clients',
  templateUrl: './draft-clients.component.html',
  styleUrls: ['./draft-clients.component.scss']
})
export class DraftClientsComponent implements OnInit {
  investors
  option = "FirstName"
  search = ''
  isLoading = true

  length
  offset = '0'
  limit = 10
  orderBy = 'created_at'
  tableSort = []
  sortName = 'DESC'
  opened = [];
  checkbox = '<i class="fa fa-check"></>';
  loaderSort = {
    FirstName: false,
    LastName: false,
    total_products: false,
    ClientNumber: false,
  }
  sortStatus = {
    total_products: "DESC",
    FirstName: "DESC",
    LastName: "ASC",
    ClientNumber: "DESC",
    total_holding: "DESC",
  }


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private toastr: ToastrService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    // alert("Yes i am in");
    this.tableSort = [true, true]
    this.getinvestors()



    $(".wtnrp").click(function () {
      $(this).parents("tr").next().toggle();
    });
  }

  clientProfile(investor) {
    var investordatas = investor
    console.log(investor)
    sessionStorage.setItem('investor', JSON.stringify(investordatas))

    this.router.navigate(['/user/edit-profile/' + investordatas.id])
  }

  formatAmount(amount) {

    return currencyFormatter.format(amount, { code: 'ZAR', symbol: '', })

  }

  toggleSort(key) {

    if (this.tableSort[key]) {
      this.tableSort[key] = false
    } else {
      this.tableSort[key] = true
    }
  }

  validateArray(array) {
    if (array.length) {
      return '<i class="fa fa-check"></i>';
    } else {
      return "";
    }
  }

  validateID(count) {
    if (count > 0) {
      return '<i class="fa fa-check"></i>';
    } else {
      return "";
    }
  }
  validateItem(item) {
    if (item) {
      return '<i class="fa fa-check"></i>';
    } else {
      return "";
    }
  }

  getToggleKey(orderName) {
    var key
    if (orderName == 'ClientNumber') {
      key = 0
    } else if (orderName == 'investor_name') {
      key = 1
    }
    return key
  }

  getToggleSort(orderName) {
    var key = this.getToggleKey(orderName)
    this.toggleSort(key)

    if (this.tableSort[key]) {
      return 'DESC'
    } else {
      return 'ASC'
    }

  }

  // {firstName:"John", lastName:"Doe", age:46}

  sort(order_by) {
    console.log(order_by)
    var sort = this.getToggleSort(order_by)
    console.log(sort)
    this.orderBy = order_by
    this.sortName = sort

    var ob = {
      offset: this.offset,
      limit: this.limit,
      order_by: this.orderBy,
      sort: this.sortName
    };

    this.loaderSort[order_by] = true;
    console.log(ob)
    this.authService.DraftInvestors(ob).subscribe(data => {

      if (data) {
        this.investors = data.data
        this.length = data.count
        console.log(data)
        this.loaderSort[order_by] = false;
      }
    }, err => {
      this.loaderSort[order_by] = false;
      console.log(err)
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }
  sortNew(order_by) {
    var sortNameNew;
    // alert(this.sortStatus[order_by])
    if (this.sortStatus[order_by] == "DESC") {
      sortNameNew = "ASC";
      this.sortStatus[order_by] = "ASC";
    } else {
      sortNameNew = "DESC";
      this.sortStatus[order_by] = "DESC";
    }

    var sort = this.getToggleSort(order_by)
    console.log(sort)
    this.orderBy = order_by
    this.sortName = sort

    var ob = {
      offset: this.offset,
      limit: this.limit,
      order_by: this.orderBy,
      sort: sortNameNew
    };

    this.loaderSort[order_by] = true;
    console.log(ob)
    this.authService.DraftInvestors(ob).subscribe(data => {

      if (data) {
        this.investors = data.data
        this.length = data.count
        console.log(data)
        this.loaderSort[order_by] = false;
      }
    }, err => {
      this.loaderSort[order_by] = false;
      console.log(err)
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }

  // form = new FormGroup({

  // });
  toggle(id) {
    const index = this.opened.indexOf(id);
    if (index > -1) {
      this.opened.splice(index, 1);
    } else {
      this.opened.push(id);
    }
  }


  getinvestors() {

    var ob = {
      offset: this.offset,
      limit: this.limit,
      order_by: "LastName",
      sort: "DESC"
    };

    this.authService.DraftInvestors(ob).subscribe(data => {

      if (data.success == 1) {
        this.investors = data.data
        this.length = data.count
        // console.log(data.data.count)
      } else {
        this.toastr.error(data.message, 'Error');
      }

      this.isLoading = false;
    }, err => {

      // console.log(err)
      this.authService.showAuthError(err);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }



  paginationOptionChange(evt) {
    console.log(evt)
    this.offset = (evt.pageIndex * evt.pageSize).toString()
    this.limit = evt.pageSize

    var ob = {
      offset: this.offset,
      limit: this.limit,
      order_by: this.orderBy,
      sort: this.sortName
    };
    this.authService.DraftInvestors(ob).subscribe(data => {

      if (data) {
        this.investors = data.data
        this.length = data.count
        // console.log(this.investors)
      }
    }, err => {
      console.log(err)
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

  }

  getSearch() {
    console.log('search')

    if (this.search != '') {

      var ob = {
        option: this.option,
        search: this.search,
        offset: this.offset,
        limit: this.limit,
        order_by: this.orderBy,
        sort: this.sortName
      };

      this.authService.DraftInvestors(ob).subscribe(data => {

        if (data) {
          this.investors = data.data
          this.length = data.count
          // console.log(this.investors)
        }
      }, err => {
        console.log(err)
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
      console.log('go for search');
    } else {
      var ob2 = {
        offset: this.offset,
        limit: this.limit,
        order_by: this.orderBy,
        sort: this.sortName
      };
      this.authService.DraftInvestors(ob2).subscribe(data => {

        if (data) {
          this.investors = data.data
          this.length = data.count
          // console.log(this.investors)
        }
      }, err => {
        console.log(err)
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
    }


    console.log(this.search, this.option)
  }

  getTotalNoOfProducts(ele) {
    var totalHolding = 0;
    var TempDeal = [];
    var totalProduct = 0;
    ele.forEach((element, ind) => {
      if (ind == 0) {
        TempDeal.push(element.deal_reference);
        if (element.investor_clients_deal_single) { //make sure deal is active or inactive // if null then deal is not active
          ++totalProduct;
        }
      } else {
        if (TempDeal.indexOf(element.deal_reference) == -1) {
          if (element.investor_clients_deal_single) { //make sure deal is active or inactive // if null then deal is not active
            ++totalProduct;
          }
        }
      }
    });

    return totalProduct

  }

  getTotalHolding(ele) {
    var totalHolding = 0;
    var TempDeal = [];
    ele.forEach((element, ind) => {
      if (ind == 0) {
        TempDeal.push(element.deal_reference);
        if (element.investor_clients_deal_single) {
          element.investor_clients_deal_single.dealAttribute_balance.forEach(balance => {
            totalHolding = totalHolding + balance.net_amount
          });
        }
      } else {
        if (TempDeal.indexOf(element.deal_reference) == -1) {
          // console.log("Im here -> "+element.deal_reference);
          if (element.investor_clients_deal_single) {
            element.investor_clients_deal_single.dealAttribute_balance.forEach(balance => {
              totalHolding = totalHolding + balance.net_amount
            });
          }
        }
      }
    });
    return totalHolding.toFixed(2);
  }

  getDownload() {
    var data1 = []
    console.log('download')
    var ob = {
      offset: '0',
      limit: this.length
    };
    this.authService.DraftInvestors(ob).subscribe(data => {
      if (data) {
        console.log(data)
        var list = data.data;
        var total = data.data.length
        list.forEach(function (item) {

          if (item.Year1 == null) item.Year1 = 0
          if (item.Year2 == null) item.Year2 = 0
          if (item.Year3 == null) item.Year3 = 0
          if (item.Year4 == null) item.Year4 = 0
          if (item.Year5 == null) item.Year5 = 0
          if (item.Year6 == null) item.Year6 = 0
          // code...

          data1.push({
            // console.log(list[i])
            investor_number: item.investor_number,
            FirstName: item.FirstName,
            LastName: item.LastName,
            IdNumber: item.IdNumber,
            CellNumber: item.CellNumber,
            Email: item.Email,
            HomeNumber: item.HomeNumber,
            WorkNumber: item.WorkNumber,
            HomeAddress: item.HomeAddress,
            PostalAddress: item.PostalAddress,
            TaxNumber: item.TaxNumber,
            MaritalStatus: item.MaritalStatus,
            BankName: item.BankName,
            BankNumber: item.BankNumber,
            AccountType: item.AccountType,
            Note: item.Note,
            Year1: item.Year1,
            Year2: item.Year2,
            Year3: item.Year3,
            Year4: item.Year4,
            Year5: item.Year5,
            Year6: item.Year6,
          })
        });
        var head = ['Investor No.', 'First Name', 'Last Name', 'Id Number', 'Cell Number', 'Email', 'Home Number', 'Work Number', 'Home Address', 'Postal Address', 'Tax Number', 'Marital Status', 'Bank Name', 'Bank Number', 'Account Type', 'Note', 'Risk Profiler % (Year 1)', 'Risk Profiler % (Year 2)', 'Risk Profiler % (Year 3)', 'Risk Profiler % (Year 4)', 'Risk Profiler % (Year 5)', 'Risk Profiler % (Year 6)'];
        new Angular5Csv(data1, 'investors' + new Date().getTime(), { headers: (head) });
      }
    }, err => {
      console.log(err)
    })
  }

  deleteInvestor(id){
    var obj = {
      id: id,
    }

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.authService.deleteInvestor(obj).subscribe(data => {
          console.log(data);
          if (data.success == 1) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.ngOnInit()
          } else {
            this.toastr.error(data.message, 'Error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  }
}

