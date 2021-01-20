import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $;
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {
  data
  constructor(private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getTerms()
  }

  getTerms() {
    this.authService.getTerms().subscribe(data => {
      console.log(data)
      if (data.success) {
        this.data = data.data.content
      }
    }, err => {
      console.log(err)
    })
  }
}
