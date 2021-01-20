import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';
// import { } from '@types/googlemaps';
declare var $;


@Component({
  selector: 'app-add-lead-list',
  templateUrl: './add-lead-list.component.html',
  styleUrls: ['./add-lead-list.component.scss']
})
export class AddLeadListComponent implements OnInit {
  latitude = '28.7041';
  longitude = '77.1025';
  user
  constructor(private service: AuthService, private toastr: ToastrService, private router: Router) { }
  saveButton = false
  follow_up_date
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

    this.status.setValue('visitor')

  }




  placeChangedCallback(evt: any) {
    console.log(evt)
  }
  form = new FormGroup({
    LastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*'), Validators.maxLength(15)]),
    FirstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*'), Validators.maxLength(15)]),
    IdNumber: new FormControl('', [ Validators.pattern('^[a-zA-Z0-9 ]*'), Validators.maxLength(15)]),
    CellNumber: new FormControl('', [ Validators.pattern('^[0-9]*'), Validators.maxLength(15)]),
    Email: new FormControl('', [ Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
    HomeAddress: new FormControl('', [ Validators.pattern('^[a-zA-Z0-9 #,.]*'), Validators.maxLength(255)]),
    HomeNumber: new FormControl('', [Validators.pattern('^[0-9]*'), Validators.maxLength(15)]),
    MaritalStatus: new FormControl('',),
    Note: new FormControl('', [Validators.maxLength(1000)]),
    status: new FormControl(''),


  });
  get LastName() { return this.form.get('LastName'); }
  get FirstName() { return this.form.get('FirstName'); }
  get IdNumber() { return this.form.get('IdNumber'); }
  get CellNumber() { return this.form.get('CellNumber'); }
  get HomeNumber() { return this.form.get('HomeNumber'); }
  get Email() { return this.form.get('Email'); }
  get HomeAddress() { return this.form.get('HomeAddress'); }
  get MaritalStatus() { return this.form.get('MaritalStatus'); }
  get Note() { return this.form.get('Note'); }
  get status() { return this.form.get('status'); }

  addLead() {

    console.log('submit');

    console.log(this.form.value)
    var check = this.form.valid
    this.saveButton = true

    // if (check && this.follow_up_date) {

      console.log('valid')
      var ob = this.form.value
      ob.broker_id = this.user.id
      ob.follow_up_date = this.follow_up_date
      this.service.addLead(ob).subscribe(data => {
        if (data.success == 1) {
          console.log('success added')
          this.toastr.success(data.message)
          this.router.navigate(['/user/leadList'])
        } else {
          this.toastr.error(data.message)
        }
      }, err => {
        console.log(err)
      })
    // } else {
    //   console.log('invalid')
    // }
    // form.value

  }

}
