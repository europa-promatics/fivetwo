import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';
import Swal from 'sweetalert2';

import { SharedServiceService } from "./../../auth/shared-service.service"
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-db-tasks',
  templateUrl: './db-tasks.component.html',
  styleUrls: ['./db-tasks.component.scss']
})
export class DbTasksComponent implements OnInit {
  user
  data = []
  offset = '0'
  limit = 50
  length
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private sharedService : SharedServiceService,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    this.getTask()
  }
  getTask() {
    var obj = {
      id: this.user.id,
      offset: this.offset,
      limit: this.limit
    }
    this.authService.getTasks(obj).subscribe(data => {
      console.log("==data", data)
      if (data.success == 1) {
        this.data = data.data
        this.length = data.count
      } else {
        this.toastr.error(data.message, 'Error');
      }
    }, err => {
      console.log(err)
      this.toastr.error(this.authService.COMMON_ERROR);
    })
  }

  editSubject(index) {
    console.log("====")
    this.data[index].edit_subject = true
    console.log(this.data)
  }

  editDescription(index) {
    console.log("====")
    this.data[index].edit_description = true
    console.log(this.data)
  }

  saveSubject(item) {
    var obj = {
      id: item.id,
      subject: item.subject,
      update_type: 'subject'
    }

    this.authService.editTask(obj).subscribe(data => {
      console.log("==data", data)
      if (data.success == 1) {
        item.edit_subject = false
      } else {
        this.toastr.error(data.message, 'Error');
      }
    }, err => {
      console.log(err)
      this.toastr.error(this.authService.COMMON_ERROR);

    })
  }

  saveDescription(item) {
    var obj = {
      id: item.id,
      description: item.description,
      update_type: 'description'
    }
    this.authService.editTask(obj).subscribe(data => {
      console.log("==data", data)
      if (data.success == 1) {
        item.edit_description = false
        item.show = false
      } else {
        this.toastr.error(data.message, 'Error');
      }
    }, err => {
      console.log(err)
      this.toastr.error(this.authService.COMMON_ERROR);

    })
  }

  deleteTask(item) {
    var obj = {
      id: item.id,
    }

    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it ',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.authService.deleteTask(obj).subscribe(data => {
          console.log(data);
          if (data.success == 1) 
          {
            this.sharedService.sidebarCount();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
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
          'Your file is safe :)',
          'error'
        )
      }
    })
  }

  changeStatus(status, item) {
    var obj = {
      id: item.id,
      status: status
    }
    this.authService.changeTaskStatus(obj).subscribe(data => {
      console.log("==data", data)
      if (data.success == 1) {
        this.ngOnInit()
      } else {
        this.toastr.error(data.message, 'Error');
      }
    }, err => {
      console.log(err)
      this.toastr.error(this.authService.COMMON_ERROR);

    })
  }

  paginationOptionChange(evt) {
    console.log(evt)
    this.offset = (evt.pageIndex * evt.pageSize).toString()
    this.limit = evt.pageSize

    var obj = {
      id: this.user.id,
      offset: this.offset,
      limit: this.limit
    };
    this.authService.getTasks(obj).subscribe(data => {
      if (data) {
        this.data = data.data
        this.length = data.count
        // console.log(this.investors)
      }
    }, err => {
      console.log(err)
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

  }

  conditionCheck(item) {
    var now = new Date()
    var datePipe = new DatePipe('en-US');
    let date = datePipe.transform(now, 'yyyy-MM-dd');
    // console.log(date, item.follow_up_date)
    if (item.follow_up_date <= date && item.status == 'in_progress') {
      return true
    } else {
      return false
    }
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

    this.authService.updateTaskFollowDate(obj).subscribe(data => {
      
      if (data) {
        this.toastr.success(data.message,"Success!");
      }
    }, err => {
      //this.authService.showAuthError(err);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

	  }
}
