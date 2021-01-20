import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';

@Component({
  selector: 'app-db-header',
  templateUrl: './db-header.component.html',
  styleUrls: ['./db-header.component.scss']
})
export class DbHeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  logout(){
  	
  	// console.log('logout');
  	return this.authService.logout();
  	// alert('tha');
  }

}
