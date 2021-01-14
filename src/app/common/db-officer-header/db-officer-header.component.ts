import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';

@Component({
  selector: 'app-db-officer-header',
  templateUrl: './db-officer-header.component.html',
  styleUrls: ['./db-officer-header.component.scss']
})
export class DbOfficerHeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  logout(){
  	
  	console.log('logout');
  	return this.authService.officerLogout();
  	// alert('tha');
  }

}
