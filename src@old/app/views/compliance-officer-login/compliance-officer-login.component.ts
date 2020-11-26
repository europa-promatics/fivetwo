import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from  "@angular/router";
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { AuthService } from '../.././auth/auth.service';

@Component({
  selector: 'app-compliance-officer-login',
  templateUrl: './compliance-officer-login.component.html',
  styleUrls: ['./compliance-officer-login.component.scss']
})
export class ComplianceOfficerLoginComponent implements OnInit {
	signinclick=false

  constructor(private authService:AuthService,private route:ActivatedRoute, private router:Router) { }

  	ngOnInit() {
      if(this.authService.isLoggedIn){
        // console.log(this.authService.isLoggedIn);
          return this.router.navigate(["/user/dashboard"]);
      }else{
        // console.log(this.authService.isLoggedIn);    
      }
  	}
  	
  	form = new FormGroup({
    	email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    	remember: new FormControl(''),
    	type: new FormControl('officer'),
  	});

  	submit() {

  		var formdata = JSON.stringify(this.form.value);
  		// formdata.type='officer'
  		console.log(formdata);
  		// return
      
      if (this.form.value.remember) {
        var remember=true;
      }else{
        var remember=false;
      }
  		
  		return this.authService.officerLogin(formdata,remember);
    
  	}

    signInClick(){

      console.log('click');
      this.signinclick=true;
      if (this.form.valid) {
        this.submit();
      }
    }
    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }

}
