import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	submit=false
  constructor(private route:ActivatedRoute,private router:Router,private authService:AuthService,private toastr: ToastrService,public formBuilder: FormBuilder) { }

  ngOnInit() {
  }


  form = new FormGroup({
  	email: new FormControl('',Validators.required),
  	type:new FormControl('user')
  })

  get email(){ return this.form.get('email') }
  get submitClick(){ return this.submit }

  onSubmit(){
  	this.submit=true
  	console.log('submit click--------------','onSubmit')
  	console.log('form data-----------------',this.form.value)

  	if (this.form.valid) {
  		console.log('form valid--------------','form valid')
	  	this.authService.forgotPassword(this.form.value).subscribe(data =>{
	  		if (data.success==1) {
	  			console.log(data)
	  			this.toastr.success(data.message)
	  			this.router.navigate(['/login']);
	  		}else{
	  			this.toastr.error(data.message)
	  		}
	  	},error=>{
	  		console.log(error)
	  		this.toastr.error(error.message)
	  	})

  	}


  }

}
