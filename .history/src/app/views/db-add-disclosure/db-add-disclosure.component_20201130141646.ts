import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';

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
  // thirdStep
  ThirdStepStatus=false
  constructor(private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
  	this.getInvestor()

  		let d = new Date();
        let currDate = d.getDate();
        let currMonth = d.getMonth()+1;
        let currYear = d.getFullYear();
        let today=currYear + "-" + ((currMonth<10) ? '0'+currMonth : currMonth )+ "-" + ((currDate<10) ? '0'+currDate : currDate );
        

        this.DisclosureDate=today
  }
  get thirdStep() { return this.ThirdStepStatus; }

  ngAfterViewInit() {
        this.DisclosureSign=''
        
    }

  getInvestor(){
  	var investor_data = JSON.parse(sessionStorage.getItem('investor'))

  	if (investor_data!=null) {
  		this.investor=investor_data
  		this.investor_id=investor_data.id
  		this.DisclosureName= investor_data.FirstName+' '+investor_data.LastName; 
  		console.log(this.investor)
  		
  	}
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
       
        var agree='no';

            // this.DisclosureName.trim();
        if(this.DisclosureName!='' && this.DisclosureDate!=''){
            agree='yes';
            var formdata: FormData = new FormData();
            formdata.append("id", this.investor_id);
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

            this.authService.addInvestorThirdForm(formdata).subscribe(data => {
                
                // console.log('in');
                if (data.success == 1) {
                    
                    console.log(data);

                    var investor_data = data.data
              		sessionStorage.setItem('investor',JSON.stringify(investor_data))
                  
                    this.toastr.success('Disclosure added successfully')
              		this.router.navigate(['/user/clientProfile']);
                    // stepper.next();
                    // this.stepperNextAsyc(stepper,'3')

                }else  {
                    // this.toastr.error(data.message, 'Error');
                }
            }, err => {
                    console.log(err)
                    // this.toastr.error(this.authService.COMMON_ERROR);
                
            })
                    return

            // console.log('execute');
        }

    }

    DisclosureSignUpload(evt: any){
        // console.log(evt)
        this.DisclosureSign = evt;    

    }
    
    updateDisclosure(){
        
        var obj = {
          //  date_from : this.dateFrom,
           // date_to : this.dateTo,
        };
        this.authService.updateDisclosure(obj).subscribe(data => {

            if (data.success == 1) {
                console.log(data)			
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

}
