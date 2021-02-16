import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

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
    BROKER

    summary_of_discussion = []
    summary_of_advice = []
    explain = []

    button_download = "Download";
    button_email = "Send Email";


  constructor(private route : ActivatedRoute, private _location: Location,private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
  	this.getInvestor()

  	let d = new Date();
  	let currDate = d.getDate();
  	let currMonth = d.getMonth()+1;
  	let currYear = d.getFullYear();
  	let today=currYear + "-" + ((currMonth<10) ? '0'+currMonth : currMonth )+ "-" + ((currDate<10) ? '0'+currDate : currDate );
  	
    this.RecordAdviceDate=today
    this.BROKER = this.authService.getLoggedUserDetails();

    this.getRecordAdviceData(this.BROKER.id);
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
  	// var investor_data = JSON.parse(sessionStorage.getItem('investor'))

  	// if (investor_data!=null) {
  	// 	this.investor=investor_data
  	// 	this.investor_id=investor_data.id
  	// 	console.log(this.investor)
  		
      // }
      var ob = {
        id: atob(this.route.snapshot.params.investor_id),
      };
      console.log(ob)
      this.authService.singleInvestor(ob).subscribe(data => {
  
        if (data.success) {
            this.investor = data.data
            this.RecordAdviceClient = this.investor.FirstName + " "+this.investor.LastName;
            this.RecordAdviceAdvisor = this.BROKER ? this.BROKER.full_name : "--";
            this.investor_id=atob(this.route.snapshot.params.investor_id)

        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
        //this.toastr.error(err.message);
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
  }

    onChangeSummary(event){
        console.log(event)
        this.RecordAdviceSummaryOfDiscussionWithClient = event.value
    }

    onChangeAdvisor(event){
        console.log(event)
        this.RecordAdviceSummaryOfAdviceFromAdvisor = event.value
    }
    onChangeExplain(event){
        console.log(event)
        this.RecordAdviceOfAdvisorExplain = event.value
    }

  getRecordAdviceData(broker_id){
    var obj = {
        broker_id : broker_id,
    }
    this.authService.getRecordAdviceData().subscribe(data => {
        console.log(data)
        // alert(data)

        if (data.success == 1) {

            
            this.summary_of_advice = data.summary_of_advice;
            this.summary_of_discussion = data.summary_of_discussion;
            this.explain = data.explain;

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

  public add(type){

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
            formdata.append("type", type);

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

            if(type == "email"){
                this.button_email = "Sending...";
            }else{
                this.button_download = "Download";
            }


            this.authService.addInvestorForthForm(formdata).subscribe(data => {
                
                // console.log('in');
                if (data.success == 1) {
                   
                    console.log(data);

                    var investor_data = data.data
              		sessionStorage.setItem('investor',JSON.stringify(investor_data))
                    if(type == "email"){
                        this.toastr.success('Record of Advice sent via Email');
                    }else{
                        this.toastr.success('Record of Advice added successfully');
                        window.open(environment.recordAdvice+""+data.pdfName)
                    }
                    
                    this._location.back();
                    // stepper.next();
                    // this.stepperNextAsyc(stepper,'4')
                    // this.DisclosureSign=null;

                }else  {
                    // this.toastr.error(data.message, 'Error');
                }

                this.button_email = "Send Email";
                this.button_download = "Download";
            }, err => {
                this.button_email = "Send Email";
                this.button_download = "Download";
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
