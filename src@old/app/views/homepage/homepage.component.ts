import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $;
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';
import { environment } from "../../../environments/environment";
declare const paral: any;

declare var $;

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

	customOptions: OwlOptions = {
		autoplay: true,
		loop: true,
		margin: 0,
		nav: true,
		dots: false,
		autoHeight: false,
		mouseDrag: false,
		autoplayHoverPause: true,
		items: 1,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		navText: [
			"<i class='owl-direction'><</i>",
			"<i class='owl-direction'>></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			940: {
				items: 1
			}
		},
	}

	banner_img_url
	howItWorks_url
	banner_data = []
	aboutUs
	howItWorks = []
	about_us_url
	constructor(
		private authService: AuthService,
		private toastr: ToastrService
	) {
		this.getAboutUs()
		this.getHomeBanner()
		this.getHowItWorks()
	}

	ngOnInit() {
		this.banner_img_url = environment.image_url + 'banner_imgs/'
		this.howItWorks_url = environment.image_url + 'HowItWorks_Imgs/'
		this.about_us_url = environment.image_url +  'aboutUs/'
		paral();
	}

	getHomeBanner() {
		this.authService.getHomeBanner().subscribe(data => {
			console.log(data)
			if (data.success) {
				this.banner_data = data.data
			}
		}, err => {
			console.log(err)
		})
	}

	getAboutUs() {
		this.authService.getAboutUs().subscribe(data => {
			console.log(data)
			if (data.success) {
				this.aboutUs = data.data
			}
		}, err => {
			console.log(err)
		})
	}

	getHowItWorks(){
		this.authService.getHowItWorks().subscribe(data => {
			console.log(data)
			if (data.success) {
				this.howItWorks = data.data
			}
		}, err => {
			console.log(err)
		})
	}
}
