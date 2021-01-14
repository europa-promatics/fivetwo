import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-db-add-task',
  templateUrl: './db-add-task.component.html',
  styleUrls: ['./db-add-task.component.scss']
})
export class DbAddTaskComponent implements OnInit {
  currentDate = new Date();

  form = new FormGroup({
    date: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required, Validators.minLength(1)]),
    description: new FormControl('', [Validators.required]),
  });

  get date() { return this.form.get('date'); }
  // get follow_up_date() { return this.form.get('follow_up_date'); }
  get subject() { return this.form.get('subject'); }
  get description() { return this.form.get('description'); }

  submit_button = false
  user
  follow_up_date
  status 
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    var datePipe = new DatePipe('en-US');
    let date = datePipe.transform(this.currentDate, 'MM/dd/yyyy');
    this.form.controls['date'].setValue(date);
    this.status = 'completed'
  }

  submit() {
    this.submit_button = true
    console.log(this.form.valid)
    console.log(this.form.value)
    if (this.form.valid && this.follow_up_date) {
      var obj = {
        id: this.user.id,
        current_date: new Date(),
        follow_up_date: this.follow_up_date,
        subject: this.form.value.subject,
        description: this.form.value.description,
        status: this.status
      }
      console.log("===obj",obj)
      this.authService.addTask(obj).subscribe(data => {
        console.log("==data",data)
        if (data.success == 1) {
          // this.router.navigate(['/user/dashboard']);
          this.router.navigate(['/user/dbTasks'])
        } else {
          this.toastr.error(data.message, 'Error');
        }
      }, err => {
        console.log(err)
        this.toastr.error(this.authService.COMMON_ERROR);

      })
    }
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // alert(event.value)
  }
}
