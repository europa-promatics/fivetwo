import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {SharedServiceService} from './../../auth/shared-service.service';

declare var $;

@Component({
  selector: 'app-db-sidebar',
  templateUrl: './db-sidebar.component.html',
  styleUrls: ['./db-sidebar.component.scss']
})
export class DbSidebarComponent implements OnInit {
  user
  task_count: 0
  lead_count: 0
  subscription: Subscription;
  constructor(private authService: AuthService, 
    private router: Router, 
    private toastr: ToastrService,
    private sharedServiceService: SharedServiceService
    ) {

      this.subscription = this.sharedServiceService.sidebarService().subscribe(x => {
        console.log('---x',x)                  
        this.task_count = x.task_count; 
        this.lead_count = x.lead_count;
        // this.notificationListData==x.notlist;
      });

     }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    this.count()
    // $('[data-toggle="tooltip"]').tooltip(); 
  }

  logout() {

    console.log('logout');
    return this.authService.logout();
    // alert('tha');
  }

  isCurrentUrl(url) {
    if (this.router.url.includes(url)) {
      return true;
    }
    if (this.router.url.includes(url)) {
      return true;
    }
    return false;
  }

  count() {
    var obj = {
      id: this.user.id,
    }
    this.authService.sideBarCount(obj).subscribe(data => {
      console.log("==data", data)
      if (data.success == 1) {
        this.task_count = data.task_count
        this.lead_count = data.lead_count

      } else {
        this.toastr.error(data.message, 'Error');
      }
    }, err => {
      console.log(err)
      this.toastr.error(this.authService.COMMON_ERROR);

    })
  }

}
