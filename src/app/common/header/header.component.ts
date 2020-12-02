import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logged
  constructor(private authService:AuthService,private route:ActivatedRoute, private router:Router) {

  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.logged = true;
      // console.log(this.authService.isLoggedIn);

    }else{
      this.logged = false;
      // console.log(this.authService.isLoggedIn);
    }
  }

}
