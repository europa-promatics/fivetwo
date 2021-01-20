import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';

@Component({
  selector: 'app-db-officer-sidebar',
  templateUrl: './db-officer-sidebar.component.html',
  styleUrls: ['./db-officer-sidebar.component.scss']
})
export class DbOfficerSidebarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  logout(){
  	
  	console.log('logout');
  	return this.authService.officerLogout();
  	// alert('tha');
  }

  

  
}
