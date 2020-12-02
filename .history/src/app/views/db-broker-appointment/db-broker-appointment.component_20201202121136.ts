import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from  "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-db-broker-appointment',
  templateUrl: './db-broker-appointment.component.html',
  styleUrls: ['./db-broker-appointment.component.scss']
})
export class DbBrokerAppointmentComponent implements OnInit {
	investor
	investor_id
	OwnerInsured
	PostalAddress
	IdNumber
	HomeNumber
	WorkNumber
	CellNumber
	Email
	DateSigned
	Signature
	FormStatus
	companies
	broker_codes
	investors_data


  constructor(private _location: Location,private route:ActivatedRoute,private router:Router,private authService:AuthService,private toastr: ToastrService,public formBuilder: FormBuilder) { }

  	form = new FormGroup({
        
        OwnerInsured: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*'),
                    Validators.minLength(1), Validators.maxLength(20)]),
        PostalAddress: new FormControl('', [ Validators.pattern('^[a-zA-Z0-9 #,.]*'),
                    Validators.minLength(1), Validators.maxLength(60)]),
        IdNumber: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*'),
                    Validators.minLength(1), Validators.maxLength(20)]),
        HomeNumber: new FormControl('', [Validators.pattern('^[0-9]*'),
                    Validators.minLength(1), Validators.maxLength(20)]),
        WorkNumber: new FormControl('', [ Validators.pattern('^[0-9]*'),
                    Validators.minLength(1), Validators.maxLength(20)]),
        CellNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*'),
                    Validators.minLength(1), Validators.maxLength(20)]),
        Email: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
        company_id: new FormControl('', [Validators.required]),
        broker_code_id: new FormControl('', [Validators.required]),
        // DateSigned: new FormControl(''),
    })
   
   

  ngOnInit() {
  	this.getInvestor()
  	this.getCompanies()
  	let d = new Date();
   let currDate = d.getDate();
   let currMonth = d.getMonth()+1;
   let currYear = d.getFullYear();
   let today=currYear + "-" + ((currMonth<10) ? '0'+currMonth : currMonth )+ "-" + ((currDate<10) ? '0'+currDate : currDate );

   this.DateSigned=today


   // this.form.controls['DateSigned'].setValue(lead.LastName);
  }

  getInvestor(){
  	var investor_data = JSON.parse(sessionStorage.getItem('investor'))

  	if (investor_data!=null) {
  		this.investor=investor_data
  		this.investor_id=investor_data.id
  		console.log(this.investor)
  		
  	}
  }

  changeCompany(evt:any){

  	console.log('change')
  	console.log(evt.target.value)
  	var company_id = evt.target.value
  	this.getBrokerCodes(company_id)

  }

  getBrokerCodes(company_id){
  	var ob = {
  		company_id:company_id
  	}

  	this.authService.broker_codes(ob).subscribe(data => {
  	    
  	    if (data.success == 1) {    
  	    	
  	        this.broker_codes = data.data
  	        console.log(this.broker_codes);
  	        this.form.controls['broker_code_id'].setValue(this.broker_codes[0].id);

  	    }else  {
  	        // this.toastr.error(data.message, 'Error');
  	    }
  	}, err => {
  	        console.log(err)
  	        // this.toastr.error(this.authService.COMMON_ERROR);
  	})
  }

  getCompanies(){

  	this.authService.companies().subscribe(data => {
  	    
  	    if (data.success == 1) {    

  	        this.companies = data.data
  	        console.log(this.companies);
  	        this.form.controls['company_id'].setValue(this.companies[0].id);

  	        this.getBrokerCodes(this.companies[0].id)

  	    }else  {
  	        // this.toastr.error(data.message, 'Error');
  	    }
  	}, err => {
  	        console.log(err)
  	        // this.toastr.error(this.authService.COMMON_ERROR);
  	})
  }

  
  

  placeChangedCallback(evt:any){
  	// evt
  }

  	ngAfterViewInit() {
        this.Signature=''
    }

    
    get steps() { return this.FormStatus; }
    get OwnerInsuredVal() { return this.form.get('OwnerInsured'); }
    get PostalAddressVal() { return this.form.get('PostalAddress'); }
    get IdNumberVal() { return this.form.get('IdNumber'); }
    get HomeNumberVal() { return this.form.get('HomeNumber'); }
    get WorkNumberVal() { return this.form.get('WorkNumber'); }
    get CellNumberVal() { return this.form.get('CellNumber'); }
    get EmailVal() { return this.form.get('Email'); }
    get company_idVal() { return this.form.get('company_id'); }

    


    public add(){
  		console.log('add')
  
        this.FormStatus=true;

        console.log('third');
        
        var agree='no';

            // this.DisclosureName.trim();
        var valid = this.form.valid
        console.log(this.investor_id)
        console.log(this.form.value)
    	if (valid && this.checkFormValid()) {
    		
            var formdata: FormData = new FormData();
            formdata.append("id", this.investor_id);

            var ob = {
            	investor_id:this.investor_id,
            	form:this.form.value,
            	image:this.Signature,
            	DateSigned:this.DateSigned

            }
            // formdata.append("company_id", this.form.company_id.value);
            // formdata.append("broker_code_id", this.form.broker_code_id.value);
            // // formdata.append("form", this.form.value);
            // formdata.append("OwnerInsured", this.form.PostalAddress.value);
            // formdata.append("PostalAddress", this.form.PostalAddress.value);
            // formdata.append("IdNumber", this.form.IdNumber.value);
            // formdata.append("HomeNumber", this.form.HomeNumber.value);
            // formdata.append("WorkNumber", this.form.WorkNumber.value);
            // formdata.append("CellNumber", this.form.CellNumber.value);
            // formdata.append("Email", this.form.Email.value);
            // formdata.append("DateSigned", this.form.DateSigned.value);
            // formdata.append("image", this.Signature);

            // console.log('formdata-------------------',formdata)
            console.log(ob)
            if(this.Signature==''){
                this.toastr.warning('Please sign the form','Warning')
                return
            }
            if (this.investor_id==null || this.investor_id==undefined) {
                this.toastr.error('Something went wrong, Please try again later','Error')
                return
            }

            this.authService.addBrokerAppointment(ob).subscribe(data => {
                
                // console.log('in');
                if (data.success == 1) {
                    
                    console.log(data);

                    // var investor_data = data.data
                    // sessionStorage.setItem('investor',JSON.stringify(investor_data))

                    // this.toastr.success('Broker appointment added successfully')
                    // this.router.navigate(['/user/clientProfile']);
                    this.loadInvestors()

                }else  {
                    // this.toastr.error(data.message, 'Error');
                }
            }, err => {
                    console.log(err)
                    // this.toastr.error(this.authService.COMMON_ERROR);
            })
        } 
    }

    loadInvestors(){

		var ob={
			id:this.investor_id
		}
		this.authService.singleInvestor(ob).subscribe(data => {
            
            // console.log('in');
            if (data.success == 1) {
                
                console.log(data);

                var investor_data = data.data
                sessionStorage.setItem('investor',JSON.stringify(investor_data))
                
                this.toastr.success('Broker appointment added successfully')
                this.router.navigate(['/user/clientProfile']);
               

            }else  {
                // this.toastr.error(data.message, 'Error');
            }
        }, err => {
                console.log(err)
                // this.toastr.error(this.authService.COMMON_ERROR);
        })
    }

    checkFormValid(){

    	var status=true

    	if (this.DateSigned==null ) {
    		status=false
    	}
    	return status


    }
  

  	SignUpload(evt: any){
        // console.log(evt);
        this.Signature = evt;
    }

    goBack(){
        this._location.back();
      }

}
