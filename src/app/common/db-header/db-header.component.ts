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

  clickSidebarMiniButtton(){

    var x = document.getElementsByClassName("sidenav_db")[0];
    x.classList.toggle("side_visible");
    console.log("Clicked");

  }

  

}
