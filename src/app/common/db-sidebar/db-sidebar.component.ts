import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-db-sidebar',
  templateUrl: './db-sidebar.component.html',
  styleUrls: ['./db-sidebar.component.scss']
})
export class DbSidebarComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router,) { }

  ngOnInit() {
  	// $('[data-toggle="tooltip"]').tooltip(); 
  }

  logout(){
  	
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

}
