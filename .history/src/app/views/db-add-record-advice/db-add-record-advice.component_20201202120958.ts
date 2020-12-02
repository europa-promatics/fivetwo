import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-db-add-record-advice',
  templateUrl: './db-add-record-advice.component.html',
  styleUrls: ['./db-add-record-advice.component.scss']
})
export class DbAddRecordAdviceComponent implements OnInit {
	investor_id
	investor
	RecordAdviceDate
    RecordAdviceClient
    RecordAdviceAdvisor
    RecordAdviceSummaryOfDiscussionWithClient
    RecordAdviceSummaryOfAdviceFromAdvisor
    RecordAdviceOfAdvisorTaken
    RecordAdviceOfAdvisorExplain=""
    RecordAdviceClientSignature
    RecordAdviceAdvisorSignature
    ForthStepStatus=false;
    list = [
    { "name": "Yes", ID: "D1"},
    { "name": "No", ID: "D2"}
    ]
    chosenItem = this.list[0].name;
    adviseTaken

  constructor(private _location: Location,private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
  	this.getInvestor()

  	let d = new Date();
  	let currDate = d.getDate();
  	let currMonth = d.getMonth()+1;
  	let currYear = d.getFullYear();
  	let today=currYear + "-" + ((currMonth<10) ? '0'+currMonth : currMonth )+ "-" + ((currDate<10) ? '0'+currDate : currDate );
  	
  	this.RecordAdviceDate=today
  }
  get forthStep() { return this.ForthStepStatus; }
  get advisorRequired() { return (this.chosenItem=='Yes'); }

  	ngAfterViewInit() {
        // this.DisclosureSign=''
        this.RecordAdviceClientSignature=''
        this.RecordAdviceAdvisorSignature=''
        // this.RiskProfilerClientSignature=''
        // this.RiskProfilerAdvisorSignature=''
    }

  getInvestor(){
  	var investor_data = JSON.parse(sessionStorage.getItem('investor'))

  	if (investor_data!=null) {
  		this.investor=investor_data
  		this.investor_id=investor_data.id
  		console.log(this.investor)
  		
  	}
  }

  public add(){

        this.ForthStepStatus=true;
        console.log('forth');
        
        this.RecordAdviceOfAdvisorTaken = this.chosenItem;

        var validate=this.validateForthForm();
        console.log(validate)
        if (validate) {
            

            var formdata: FormData = new FormData();
            formdata.append("id", this.investor_id);
            formdata.append("RecordAdviceDate", this.RecordAdviceDate);
            formdata.append("RecordAdviceClient", this.RecordAdviceClient);
            formdata.append("RecordAdviceAdvisor", this.RecordAdviceAdvisor);
            formdata.append("RecordAdviceSummaryOfDiscussionWithClient", this.RecordAdviceSummaryOfDiscussionWithClient);
            formdata.append("RecordAdviceSummaryOfAdviceFromAdvisor", this.RecordAdviceSummaryOfAdviceFromAdvisor);
            formdata.append("RecordAdviceOfAdvisorTaken", this.RecordAdviceOfAdvisorTaken);
            formdata.append("RecordAdviceOfAdvisorExplain", this.RecordAdviceOfAdvisorExplain);
            formdata.append("RecordAdviceClientSignature", this.RecordAdviceClientSignature);
            formdata.append("RecordAdviceAdvisorSignature", this.RecordAdviceAdvisorSignature);

            // console.log(this.defaultShortImage)
            
            if(this.RecordAdviceClientSignature==''){
                this.toastr.warning('Please sign the client signature','Warning')
                return
            }
            // console.log(this.RecordAdviceAdvisorSignature)
            if(this.RecordAdviceAdvisorSignature=='' && this.chosenItem=='Yes'){
                this.toastr.warning('Please sign the advisor signature','Warning')
                return
            }

            if (this.investor_id==null || this.investor_id==undefined) {
                this.toastr.warning('Please complete form 1 first','Warning')
                return
            }
            // this.isForthStepDone=true;
            console.log('go');

            this.authService.addInvestorForthForm(formdata).subscribe(data => {
                
                // console.log('in');
                if (data.success == 1) {
                   
                    console.log(data);

                    var investor_data = data.data
              		sessionStorage.setItem('investor',JSON.stringify(investor_data))
                
                  this.toastr.success('Record of Advice added successfully')
              		this.router.navigate(['/user/clientProfile']);
                    // stepper.next();
                    // this.stepperNextAsyc(stepper,'4')
                    // this.DisclosureSign=null;

                }else  {
                    // this.toastr.error(data.message, 'Error');
                }
            }, err => {
                    console.log(err)
                    // this.toastr.error(this.authService.COMMON_ERROR);
                
            })

        }

    }

    validateForthForm(){

        var status = false;
        this.chosenItem==this.RecordAdviceOfAdvisorTaken;

        
        if (this.RecordAdviceOfAdvisorTaken=='No') {

            if(this.RecordAdviceDate!=null && this.RecordAdviceClient!=null && this.RecordAdviceSummaryOfDiscussionWithClient!=null&& this.RecordAdviceOfAdvisorExplain!=null){


                status = true;
                console.log('first if')
               
                // console.log('go');

            }
        }else{

        	
            if(this.RecordAdviceDate!=null && this.RecordAdviceClient!=null && this.RecordAdviceAdvisor!=null&& this.RecordAdviceSummaryOfDiscussionWithClient!=null&& this.RecordAdviceSummaryOfAdviceFromAdvisor!=null){



                status = true;
                console.log('go');
                console.log('second if')

            }
        }
        return status;
    }

    checkCond(cond){
        if(cond==this.adviseTaken){
             return true;
        }

       return false;
    }

    

    ClientSignUpload(evt: any){
        // console.log(evt);
        this.RecordAdviceClientSignature = evt;
    }
    AdvisorSignUpload(evt: any){
        this.RecordAdviceAdvisorSignature = evt;
    }

    adviceTaken(evt: any){
        // console.log(evt);
        this.adviseTaken=evt;
    }

    chosenItemStatus(){
        if(this.chosenItem=='No'){
            return true;
        }else{
            return false;
        }
    }

    goBack(){
        this._location.back();
      }

}
