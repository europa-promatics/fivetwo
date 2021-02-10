import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import  * as moment from 'moment';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Component({
  selector: 'app-db-edit-broker',
  templateUrl: './db-edit-broker.component.html',
  styleUrls: ['./db-edit-broker.component.scss']
})
export class DbEditBrokerComponent implements OnInit {
  
  BROKER
  password=""
  confirm_password=""
  old_password=""
  profile_image
  profile_image_data
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  contactFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*'),
  ]);
  passwordFormControl = new FormControl('', [
    //Validators.required,
  ]);
  confirm_passwordFormControl = new FormControl('', [
    //Validators.required,
  ]);
  old_passwordFormControl = new FormControl('', [
    //Validators.required,
  ]);

  broker_details

  constructor(private route: ActivatedRoute, private _location: Location,private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.BROKER = this.authService.getLoggedUserDetails();

    this.broker_details = this.BROKER;
    delete this.broker_details.password
    if(this.broker_details.profile_image){

      this.profile_image = environment.profile_image + ""+this.broker_details.profile_image

    }

  }

  editBrokerProfile(){

    var form = new FormData();
    form.append("full_name",this.broker_details.full_name); 
    form.append("contact_number",this.broker_details.contact_number); 
    form.append("email",this.broker_details.email); 
    form.append("password",this.password); 
    form.append("old_password",this.old_password); 
    if(this.profile_image_data){
      form.append("profile_image",this.profile_image_data); 
    }

    if(this.old_password){
      if(this.password && this.confirm_password){

        if(this.password == this.confirm_password){
          // do nothing
        }else{
          this.toastr.error("Password and confirm password is not matched")
        }

      }else{
        this.toastr.error("Please fill password and confirm password")
        return false
      }
    }
   
    console.log(this.broker_details)
    this.authService.editBrokerProfile(form).subscribe(data => {

      if (data.success == 1) {

            this.toastr.success(data.message)   
           localStorage.setItem('user', JSON.stringify(data.broker));
       
           sessionStorage.setItem('user', JSON.stringify(data.broker));
           this.ngOnInit()

        //this.leads = data.data
      //  this.length = data.count
        // console.log(this.investors)
      }else{
            this.toastr.error(data.message)
      }
    }, err => {
      console.log(err)
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

  }

  changeFile(event){

    console.log(event);

    if (!event.target) {
      return;
    }
    if (!event.target.files) {
      return;
    }
    if (event.target.files.length !== 1) {
      return;
    }
    const file = event.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      this.toastr.warning('Please upload image file')
      event.srcElement.value = null;
      return;
    }
    console.log(event.target.files[0])
    this.profile_image_data = event.target.files[0];
    const fr = new FileReader();
      fr.onloadend = (loadEvent) => {
      let mainImage = fr.result;
      this.profile_image = mainImage;
    };
      fr.readAsDataURL(file);
  

    // profile_image


  }

  goBack(){
    this._location.back();
  }

}
