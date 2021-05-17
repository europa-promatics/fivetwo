import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../auth/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-db-switches',
  templateUrl: './db-switches.component.html',
  styleUrls: ['./db-switches.component.scss']
})
export class DbSwitchesComponent implements OnInit {
  offset = 0
  limit = 10
  total = 0 
  search_text=""
  list = []
  constructor(public authService : AuthService,public toastr : ToastrService) { }
  
  ngOnInit() {

    this.getRequestedFunds();
  }

  getRequestedFunds(){
   
    const obj = {
      limit : this.limit,
      offset : this.offset
    }

    console.log(obj);    

    this.authService.getRequestedFunds(obj).subscribe(data => {
      if (data.success == 1) {
        this.list = data.list
        this.total = data.count
        
      } else {
        this.toastr.error(data.message, 'Error');
      }
    },(error) => {
      this.toastr.error("Something went wrong", 'Error');
    })
  }

  paginationOptionChange(evt) {
    console.log(evt)
    this.offset = (evt.pageIndex * evt.pageSize)
    this.limit = evt.pageSize
    this.getRequestedFunds()  

  }

  search(){

    console.log(this.search_text);
    


  }

}
