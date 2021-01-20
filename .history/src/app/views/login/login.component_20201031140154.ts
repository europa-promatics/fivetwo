import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from  "@angular/router";
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { AuthService } from '../.././auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    signinclick=false
    loginButtonText = "Sign In";

  	constructor(private authService:AuthService,private toastr : ToastrService,private route:ActivatedRoute, private router:Router) {

    }


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
      type: new FormControl('user'),
  	});

  	submit() {

  		var formdata = JSON.stringify(this.form.value);

      if (this.form.value.remember) {
        var remember=true;
      }else{
        var remember=false;
      }
      this.authService.login(formdata,remember);
  		//return 

  	}
  	submit2() {
        var formdata = JSON.stringify(this.form.value);
        this.loginButtonText = "Please wait ..."
        if (this.form.value.remember) {
          var remember=true;
        }else{
          var remember=false;
        }
      this.authService.loginNew(formdata,remember).subscribe(res => {
          this.loginButtonText = "Sign in"
        if (res.success==1) {
          if (remember) {
              localStorage.setItem('user', JSON.stringify(res.data));
              localStorage.setItem('token', res.token);
          }else{
              sessionStorage.setItem('user', JSON.stringify(res.data));
              localStorage.setItem('token', res.token);
          }
        //  alert(res.token);
        //  alert(localStorage.getItem('token'));
          this.toastr.success(res.message);
         this.router.navigate(['/user/dashboard']);
      }else{
        this.loginButtonText = "Sign in"
          this.toastr.error(res.message);
          // console.log(res.message);

      }
      }, err => {
        console.log(err)
        // this.toastr.error(this.authService.COMMON_ERROR);

      })
        
  		//return 

  	}

    signInClick(){

      console.log('click');
      this.signinclick=true;
      if (this.form.valid) {
        // this.submit();
        this.submit2();
      }
    }
    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }
}
