import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
// import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

declare var $;

@Component({
  selector: 'app-db-lead-list',
  templateUrl: './db-lead-list.component.html',
  styleUrls: ['./db-lead-list.component.scss']
})
export class DbLeadListComponent implements OnInit {
  leads
  search = ''
  length
  offset = '0'
  limit = 50
  opened = [];
  ModalHeading
  ModalBody
  tableSort = []
  orderBy = 'created_at'
  sortName = 'DESC'
  ShowEditNote
  lead_id
  edit = true
  // tableSort[0]
  // tableSort[1]
  // tableSort[2]
  // tableSort[3]
  // tableSort[4]
  // tableSort[5]
  // tableSort[6]


  constructor(
    private authService: AuthService,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  sortStatus = {
    total_products : "DESC", 
    FirstName : "DESC", 
    LastName : "ASC", 
    ClientNumber : "DESC", 
    total_holding : "DESC", 
    follow_up_date : "DESC", 
}

  ngOnInit() {
    this.ShowEditNote = false
    // this.tableSort={firstName:"John", lastName:"Doe", age:46}

    this.tableSort = [true, true, true, true, true, true, true]
    // tableSort[0] = true;
    // tableSort[1] = true;
    // tableSort[2] = true;
    // tableSort[3] = true;
    // tableSort[4] = true;
    // tableSort[5] = true;
    // tableSort[6] = true;
    // // tableSort[7] = true;

    // this.tableSort={
    //   LastName:'ASC',
    //   FirstName:'ASC',
    //   IdNumber:'ASC',
    //   CellNumber:'ASC',
    //   Email:'ASC',
    //   HomeAddress:'ASC',
    //   status:'ASC',
    // };

    this.getLeads()
  }

  toggleSort(key) {

    if (this.tableSort[key]) {
      this.tableSort[key] = false
    } else {
      this.tableSort[key] = true
    }
  }

  // getToggleKey(orderName) {
  //   var key
  //   if (orderName == 'ClientNumber') {
  //     key = 0
  //   } else if (orderName == 'investor_name') {
  //     key = 1
  //   }
  //   return key
  // }

  // getToggleSort(orderName) {
  //   var key = this.getToggleKey(orderName)
  //   this.toggleSort(key)

  //   if (this.tableSort[key]) {
  //     return 'DESC'
  //   } else {
  //     return 'ASC'
  //   }

  // }

  sortNew(order_by) {
    var sortNameNew ;
    // alert(this.sortStatus[order_by])
    if(this.sortStatus[order_by] == "DESC"){
      sortNameNew = "ASC";
      this.sortStatus[order_by] = "ASC";
    }else{
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

    ///this.loaderSort[order_by] = true;
    console.log(ob)
    this.authService.investors(ob).subscribe(data => {

      if (data) {
      //  this.investors = data.data
        this.length = data.count
        console.log(data)
        //this.loaderSort[order_by] = false;
      }
    }, err => {
      //this.loaderSort[order_by] = false;
      console.log(err)
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }

  getToggleKey(orderName) {
    var key
    if (orderName == 'LastName') {
      key = 0
    } else if (orderName == 'FirstName') {
      key = 1
    } else if (orderName == 'IdNumber') {
      key = 2
    } else if (orderName == 'CellNumber') {
      key = 3
    } else if (orderName == 'Email') {
      key = 4
    } else if (orderName == 'HomeAddress') {
      key = 5
    } else if (orderName == 'status') {
      key = 6    
    } else if (orderName == 'follow_up_date') {
      key = 7
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
    console.log(ob)
    this.service.leads(ob).subscribe(data => {

      if (data) {
        this.leads = data.data
        this.length = data.count
        console.log(data)
      }
    }, err => {
      console.log(err)
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }

  toggle(id) {
    this.opened = [];
    const index = this.opened.indexOf(id);
    if (index > -1) {
      this.opened.splice(index, 1);
    } else {
      this.opened.push(id);
    }
  }

  getLeads() {

    var ob = {
      offset: this.offset,
      limit: this.limit,
      order_by: this.orderBy,
      sort: this.sortName
    };

    this.service.leads(ob).subscribe(data => {
      console.log(data)

      if (data) {
        this.leads = data.data
        this.length = data.count
        // console.log(data.data.count)
      }
    }, err => {
      console.log(err)
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
    this.service.leads(ob).subscribe(data => {
      if (data) {
        this.leads = data.data
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
    console.log(this.search)

    if (this.search != '') {

      var ob = {
        // option:this.option,
        search: this.search,
        offset: this.offset,
        limit: this.limit,
        order_by: this.orderBy,
        sort: this.sortName
      };
      console.log(ob)
      this.service.leads(ob).subscribe(data => {

        if (data) {
          this.leads = data.data
          this.length = data.count
          // console.log(this.investors)
        }
      }, err => {
        console.log(err)
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
      console.log('go for search');
    } else {
      this.getLeads()
    }


  }

  // warn

  // accent

  getStatusColor(status) {
    // console.log(status)
    var color = ''
    if (status == 'cancelled') {
      color = 'warn'
    } else if (status == 'investor') {
      color = 'accent'
    }
    // console.log(color)
    return color
  }

  changeStatus(id, status) {

    console.log(id, status);
    var ob = {
      id: id,
      status: status
    }

    this.service.leadStatus(ob).subscribe(data => {
      if (data) {
        console.log(data)

        if (status == 'client') {

          localStorage.setItem('lead', JSON.stringify(data.data));
          this.router.navigate(['/user/addClient']);
        }
        this.getLeads()
        // this.toastr.success(data.message)
      }
    })
  }

  updateLeadNote() {
    var ob = {
      id: this.lead_id,
      Note: this.ModalBody
    }
    this.service.updateLeadNote(ob).subscribe(data => {
      // console.log()
      if (data.success) {
        this.ShowEditNote = false
        this.getLeads()
      }
    })
  }

  viewMore(note, id) {

    console.log('viewMore')
    console.log(note, id)
    this.ModalBody = note
    this.lead_id = id
    if (!note) {
      this.edit = true
      this.ShowEditNote = true
    }
    $('#myModal').modal('show');

    // console.log(html)
  }

  deleteLead(id) {
    var obj = {
      id: id,
    }

    Swal.fire({
      title: 'Are you sure want to discard?',
      text: 'You will not be able to recover this lead!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.authService.deleteLead(obj).subscribe(data => {
          console.log(data);
          if (data.success == 1) {
            Swal.fire(
              'Deleted!',
              'Your lead has been deleted.',
              'success'
            )
            this.ngOnInit();
          } else {
            this.toastr.error(data.message, 'Error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your lead is safe :)',
          'error'
        )
      }
    })
  }

  conditionCheck(item) {
    var now = new Date()
    var datePipe = new DatePipe('en-US');
    let date = datePipe.transform(now, 'yyyy-MM-dd');
    // console.log(date, item.follow_up_date)
    if (item.follow_up_date <= date) {
      return true
    } else {
      return false
    }
  }

  showEditNote() {
    this.ShowEditNote = true
  }
  changeDate(type: string, event: MatDatepickerInputEvent<Date>,value) {
		console.log(event.value);
	//	this.dateFrom = event.value;
    console.log(`${type}: ${event.value}`);
    console.log(value);
    var obj = {
      lead_data : value,
      date : event.value,
    }

    this.service.updateLeadFollowDate(obj).subscribe(data => {
      
      if (data) {
        this.toastr.success(data.message,"Success!");
      }
    }, err => {
      this.authService.showAuthError(err);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

	  }

}
