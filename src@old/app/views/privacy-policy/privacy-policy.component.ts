import { Component, OnInit } from '@angular/core';
declare var $;
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  data
  constructor(private authService: AuthService,
		private toastr: ToastrService) { }

  ngOnInit() {
    this.getPrivacyPolicy()
  }

  getPrivacyPolicy(){
    this.authService.getPrivacyPolicy().subscribe(data => {
			console.log(data)
			if (data.success) {
				this.data = data.data.content
			}
		}, err => {
			console.log(err)
		})
  }
}
