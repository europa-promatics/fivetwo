import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

import { environment } from "./../../../environments/environment";

@Component({
  selector: 'app-db-add-disclosure',
  templateUrl: './db-add-disclosure.component.html',
  styleUrls: ['./db-add-disclosure.component.scss']
})
export class DbAddDisclosureComponent implements OnInit {
	investor_id
	investor
	
	DisclosurePDF
	DisclosureSign
	DisclosureDate
	DisclosureName
    DisclosureAgree=false
    
    BROKER
    CMS_DISCLOSURE_DATA
    RecordAdviceAdvisor
    environment = environment
    button_message= "Save"
  // thirdStep
  ThirdStepStatus=false
  constructor(private _location: Location,private route : ActivatedRoute,  private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
  	this.getInvestor()

  		let d = new Date();
        let currDate = d.getDate();
        let currMonth = d.getMonth()+1;
        let currYear = d.getFullYear();
        let today=currYear + "-" + ((currMonth<10) ? '0'+currMonth : currMonth )+ "-" + ((currDate<10) ? '0'+currDate : currDate );
        

        this.DisclosureDate=today
        this.BROKER = this.authService.getLoggedUserDetails();
        console.log("Broker -> ", this.BROKER)
        // this.RecordAdviceAdvisor = "Marthunis Oosthuizen";
        this.RecordAdviceAdvisor = this.BROKER.full_name;
        this.getDisclosureData(this.BROKER.id);


        
  }

  getDisclosureData(broker_id){
    var obj = {
        broker_id : broker_id,
    }
    this.authService.getDisclosureData(obj).subscribe(data => {
        console.log(data)
        // alert(data)

        if (data.success == 1) {

            this.CMS_DISCLOSURE_DATA = data.disclosure_data;

            // console.log(data);
            // stepper.next();


        } else {
            // this.toastr.error(data.message, 'Error');
        }
    }, err => {
        console.log(err)
        // this.toastr.error(this.authService.COMMON_ERROR);

    })
}


  get thirdStep() { return this.ThirdStepStatus; }

  ngAfterViewInit() {
        this.DisclosureSign=''
        
    }

  getInvestor(){
  	// var investor_data = JSON.parse(sessionStorage.getItem('investor'))

  	// if (investor_data!=null) {
  	// 	this.investor=investor_data
  	// 	this.investor_id=this.route.snapshot.params.investor_id
  	// 	 
  	// 	console.log(this.investor)
  		
      // }
      var ob = {
        id: atob(this.route.snapshot.params.investor_id),
      };
      console.log(ob)
      this.authService.singleInvestor(ob).subscribe(data => {
  
        if (data.success) {
            this.investor = data.data
            this.investor_id=atob(this.route.snapshot.params.investor_id)
            this.DisclosureName= this.investor.FirstName+' '+this.investor.LastName;

        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
        //this.toastr.error(err.message);
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
  }

  form3 = new FormGroup({
        // DisclosureName: new FormControl('', Validators.required),
        // DisclosureDate: new FormControl('', Validators.required),
        // DisclosureSign: new FormControl('', Validators.required),
        // DisclosureAgree: new FormControl('', Validators.required),
    });
  // public add(){
  // 	console.log('add')
  // }

  public add(){

        this.ThirdStepStatus=true;

        console.log('third');
        this.button_message = "Uploading..."
        var agree='no';

            // this.DisclosureName.trim();
        if(this.DisclosureName!='' && this.DisclosureDate!=''){
            agree='yes';
            var formdata: FormData = new FormData();
            formdata.append("investor_id", this.investor_id);
            formdata.append("DisclosureSign", this.DisclosureSign);
            formdata.append("DisclosureDate", this.DisclosureDate);
            formdata.append("DisclosureName", this.DisclosureName);
            formdata.append("DisclosureAgree", agree);

            formdata.append("image", this.DisclosureSign);

            console.log('disclosuresign',this.DisclosureSign)

            if(this.DisclosureSign==''){
                this.toastr.warning('Please sign the disclosure','Warning')
                return
            }
            if (this.investor_id==null || this.investor_id==undefined) {
                this.toastr.error('Something went wrong, Please try again later','Error')
                return
            }

            // this.isThirdStepDone=true;

            this.authService.updateDisclosure(formdata).subscribe(data => {
                
                // console.log('in');
                if (data.success == 1) {
                    
                    console.log(data);

                    var investor_data = data.data
              		sessionStorage.setItem('investor',JSON.stringify(investor_data))
                    
                    this.toastr.success('Disclosure added successfully');
                    window.open(environment.disclosurePDF + ""+data.pdfName,'_blank')
                    this.button_message = "Save";
                      // this.router.navigate(['/user/clientProfile']);
                      this._location.back();
                    // stepper.next();
                    // this.stepperNextAsyc(stepper,'3')

                }else  {
                    this.button_message = "Save";
                    // this.toastr.error(data.message, 'Error');
                }
            }, err => {
                this.button_message = "Save";
                    console.log(err)
                    // this.toastr.error(this.authService.COMMON_ERROR);
                
            })

            // console.log('execute');
        }

    }

    DisclosureSignUpload(evt: any){
        // console.log(evt)
        this.DisclosureSign = evt;    

    }
    
    updateDisclosure(){
        if(!this.DisclosurePDF){
            this.toastr.success("Please select PDF first",'Error')
            return false
        }
        var formData = new FormData();
        formData.append("pdf_file",this.DisclosurePDF);
        formData.append("investor_id",this.investor_id);
        formData.append("type","pdf");

        this.authService.updateDisclosure(formData).subscribe(data => {

            if (data.success == 1) {
                console.log(data)			
                this.toastr.success(data.message,'Success.!')
            }else{
                this.toastr.error(data.message,'Error')
            }
        }, err => {
            console.log(err)
            // If not token provided or token invalid
            this.authService.showAuthError(err);
        })  

    }

    selectPDF(event){
        this.DisclosurePDF = event.target.files[0];
        console.log(this.DisclosurePDF);

    }

    goBack(){
        this._location.back();
    }

}
