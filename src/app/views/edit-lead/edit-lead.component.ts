import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../.././auth/auth.service';

@Component({
	selector: 'app-edit-lead',
	templateUrl: './edit-lead.component.html',
	styleUrls: ['./edit-lead.component.scss']
})
export class EditLeadComponent implements OnInit {
	latitude = '28.7041';
	longitude = '77.1025';
	user
	minDate : Date
	constructor(private route: ActivatedRoute, private service: AuthService, private toastr: ToastrService, private router: Router) {

		this.minDate = new Date()

	 }
	saveButton = false
	follow_up_date
	lead_id
	ngOnInit() {
		this.lead_id = this.route.snapshot.params.id
		this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

		this.status.setValue('call_lead')
		this.getSingleLead()

	}

	placeChangedCallback(evt: any) {
		console.log(evt)
		this.HomeAddress.setValue(evt.formatted_address)
	}

	form = new FormGroup({
		LastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z -]*'), Validators.maxLength(22)]),
		FirstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z -]*'), Validators.maxLength(22)]),
		IdNumber: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ]*'), Validators.maxLength(15)]),
		CellNumber: new FormControl('', [Validators.pattern('^[0-9]*'), Validators.maxLength(15)]),
		Email: new FormControl('', [Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
		HomeAddress: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 #,.]*'), Validators.maxLength(255)]),
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


	// public handleAddressChange(address: Address) {
	// 	// Do some stuff
	// 	console.log(address)
	// 	address.address_components.forEach(element => {
	// 		this.HomeAddress.setValue(address.formatted_address)
	// 	});
	// 	// this.head_office_address[i].push()
	// }

	getSingleLead() {
		var obj = {
			id: this.lead_id
		}
		this.service.getSingleLead(obj).subscribe(data => {
			if (data.success == 1) {
				console.log('success', data.data)
				this.FirstName.setValue(data.data.FirstName)
				this.LastName.setValue(data.data.LastName)
				this.CellNumber.setValue(data.data.CellNumber)
				this.HomeAddress.setValue(data.data.HomeAddress)
				this.Email.setValue(data.data.Email)
				this.HomeNumber.setValue(data.data.HomeNumber)
				this.MaritalStatus.setValue(data.data.MaritalStatus)
				this.Note.setValue(data.data.Note)
				this.status.setValue(data.data.status)
				this.IdNumber.setValue(data.data.IdNumber)
				this.follow_up_date = data.data.follow_up_date
			} else {
				this.toastr.error(data.message)
			}
		}, err => {
			console.log(err)
		})
	}
	editLead() {
		console.log('submit');
		console.log(this.form.value)
		var check = this.form.valid
		this.saveButton = true
		console.log('valid')
		var ob = this.form.value
		ob.id = this.lead_id
		ob.follow_up_date = this.follow_up_date
		console.log("===obj==", ob)
		this.service.editLead(ob).subscribe(data => {
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
	}
}
