import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from  "@angular/router";
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';

@Component({
  selector: 'app-compliance-officer-set-password',
  templateUrl: './compliance-officer-set-password.component.html',
  styleUrls: ['./compliance-officer-set-password.component.scss']
})
export class ComplianceOfficerSetPasswordComponent implements OnInit {
	security_code
	id
  	signinclick=false
  constructor(private route:ActivatedRoute,private router:Router,private authService:AuthService,private toastr: ToastrService) { }

  ngOnInit() {

  	this.security_code = this.route.snapshot.paramMap.get("security_code")
  	this.id = this.route.snapshot.paramMap.get("id")
	  console.log('sce',this.security_code)
	  console.log('id',this.id)
  }

  form = new FormGroup({
    	
      	password: new FormControl('', Validators.required),
      	confirm_password: new FormControl('', Validators.required),
    	
      	
  	});

  	submit() {

  		var ob={
  			security_code:this.security_code,
  			id:this.id,
  			password:this.password.value,
  			confirm_password:this.confirm_password.value,
  			type:'officer'
  		}
  		console.log(ob)

  		this.authService.setPassword(ob).subscribe(data=>{

  			if (data.success==1) {
  				console.log(data.message)
  				this.toastr.success(data.message)
	  			this.router.navigate(['/officerLogin']);

  			}else{
  				console.log(data.message)
  				this.toastr.error(data.message)
  				if (data.message=='This link has been used already') {
	  				this.router.navigate(['/officerLogin']);
  				}
  			}

  		},error=>{
  			console.log(error.message)
  			this.toastr.error(error.message)
  		})

  		
  	}

    signInClick(){

      console.log('click');
      this.signinclick=true;

      var allow_submit=true
      if(this.match_password){
      	this.toastr.error('Password and confirm password does not matched')
      	allow_submit=false
      }
      if (this.form.valid&& allow_submit) {
        this.submit();
      }
    }

    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }
    get confirm_password() { return this.form.get('confirm_password'); }
    get match_password() { return this.password.value!=this.confirm_password.value }

}
