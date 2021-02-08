import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import  * as moment from 'moment';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-db-add-risk-profiler',
  templateUrl: './db-add-risk-profiler.component.html',
  styleUrls: ['./db-add-risk-profiler.component.scss']
})
export class DbAddRiskProfilerComponent implements OnInit {
	investor_id
	investor
	FifthStepStatus=false
	Year1
    Year2
    Year3
    Year4
    Year5
    Year6
    YearTotal=0
    RiskProfilerClientSignature
    RiskProfilerAdvisorSignature
    chosenItem
    errorClass=""
    current_date;
    DisclosureDate
    DisclosureName
    BROKER
    CMS_RISKPROFILER_DATA=""


  constructor(private route: ActivatedRoute, private _location: Location,private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  	ngOnInit() {

        this.DisclosureDate = moment().format("YYYY-MM-DD");
        // alert(this.DisclosureDate);
        this.getInvestor()
        this.BROKER = this.authService.getLoggedUserDetails()
        this.getRiskProfilerData(this.BROKER.id);
  	}
	ngAfterViewInit() {
        
        this.RiskProfilerClientSignature=''
        this.RiskProfilerAdvisorSignature=''
    }
  get fifthStep() { return this.FifthStepStatus; }
  get advisorRequired() { return (this.chosenItem=='Yes'); }

  getInvestor(){
  	// var investor_data = JSON.parse(sessionStorage.getItem('investor'))

  	// if (investor_data!=null) {
    //       this.investor=investor_data
    //       this.DisclosureName = investor_data.LastName + " "+investor_data.FirstName
    //     //   this.DisclosureName = investor_data.LastName
  	// 	this.investor_id = investor_data.id
  		
  	// 	console.log(this.investor)
  		
    //   }
      
      var ob = {
        id: atob(this.route.snapshot.params.investor_id),
      };
      console.log(ob)
      this.authService.singleInvestor(ob).subscribe(data => {
  
        if (data.success) {
            this.investor = data.data
            this.investor_id=atob(this.route.snapshot.params.investor_id)
            this.DisclosureName = this.investor.FirstName +" "+this.investor.LastName
            this.chosenItem = this.investor.RecordAdviceOfAdvisorTaken
            // this.Year1 = this.investor.Year1;
            // this.Year2 = this.investor.Year2;
            // this.Year3 = this.investor.Year3;
            // this.Year4 = this.investor.Year4;
            // this.Year5 = this.investor.Year5;
            // this.Year6 = this.investor.Year6;
            // this.getYearTotal()
        }
      }, err => {
        console.log(err)
        // If not token provided or token invalid
        this.authService.showAuthError(err);
        //this.toastr.error(err.message);
        // this.toastr.error(this.authService.COMMON_ERROR);
      })
  }

  getRiskProfilerData(broker_id){
    var obj = {
        broker_id : broker_id,
    }
    this.authService.getRiskProfilerData(obj).subscribe(data => {
        console.log(data)
        // alert(data)

        if (data.success == 1 && data.riskprofiler) {

            this.CMS_RISKPROFILER_DATA = data.riskprofiler.content;

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


  public add(){
      console.log('fifth');

      this.FifthStepStatus=true;

      if (this.Year1==''|| this.Year1==null) {
          this.toastr.warning('Please fill the required fields')
          return
      }

      this.getYearTotal()

      var formdata: FormData = new FormData();
      formdata.append("id", this.investor_id);
      formdata.append("RiskProfilerClientSignature", this.RiskProfilerClientSignature);
      formdata.append("RiskProfilerAdvisorSignature", this.RiskProfilerAdvisorSignature);
      formdata.append("Year1", this.Year1.toString());
      formdata.append("Year2", this.Year2.toString());
      formdata.append("Year3", this.Year3.toString());
      formdata.append("Year4", this.Year4.toString());
      formdata.append("Year5", this.Year5.toString());
      formdata.append("Year6", this.Year6.toString());
      formdata.append("edit", "true");


    //   if (this.Year1==0 || this.Year2==0|| this.Year3==0|| this.Year4==0|| this.Year5==0|| this.Year6==0) {
    //       this.toastr.warning('Year % should be greater than 0')
    //       return
    //   }
      
      if (this.YearTotal!=100) {
          this.toastr.warning('Total should be 100%')
          return
      }

      if(this.RiskProfilerClientSignature==''){
          this.toastr.warning('Please sign the client signature','Warning')
          return
      }

      if(this.RiskProfilerAdvisorSignature=='' && this.chosenItem=='Yes'){
          this.toastr.warning('Please sign the advisor signature','Warning')
          return
      }

      

      if (this.investor_id==null || this.investor_id==undefined) {
          this.toastr.error('Something went wrong, Please try again later','Error')
          return
      }

      

      this.authService.addInvestorFifthForm(formdata).subscribe(data => {
          
          // console.log('in');
          if (data.success == 1) {
             
              console.log(data);
              var investor_data = data.data
              //sessionStorage.setItem('investor',JSON.stringify(investor_data))
              window.open(environment.RiskPDF+""+data.pdfName)
              this.toastr.success('Risk Profiler added successfully')
              this._location.back();
              
              

          }else  {
              // this.toastr.error(data.message, 'Error');
          }
      }, err => {
              console.log(err)
              // this.toastr.error(this.authService.COMMON_ERROR);
          
      })

     
  }

  getYearTotal(){
      // p
       if(isNaN(this.Year1)){
          // this.Year1=0;
       }
       if(isNaN(this.Year2)){
         //  this.Year2=0;
       }
       if(isNaN(this.Year3)){
          // this.Year3=0;
       }
       if(isNaN(this.Year4)){
          // this.Year4=0;
       }
       if(isNaN(this.Year5)){
         //  this.Year5=0;
       }
       if(isNaN(this.Year6)){
           //this.Year6=0;
       }
      this.YearTotal = Number(this.Year1)+Number(this.Year2)+Number(this.Year3)+Number(this.Year4)+Number(this.Year5)+Number(this.Year6);
       if(isNaN(this.YearTotal)){
           this.YearTotal=0;
           console.log(this.YearTotal)
       }else{
           console.log(this.YearTotal)
        }

        if(this.YearTotal == 100){
            this.errorClass = "";
        }else{
            this.errorClass = "error-percent";
        }
      // this.YearTotal= YearTotals;
  }

    clearSign() {
         // console.log(evt)
        this.RiskProfilerClientSignature = "";

    }
    clearSignRiskProfiler() {
         // console.log(evt)
        this.RiskProfilerClientSignature = "";

    }

  RiskClientSignUpload(evt: any){
      // console.log(evt);
      this.RiskProfilerClientSignature = evt;
  }
  RiskAdvisorSignUpload(evt: any){
      this.RiskProfilerAdvisorSignature = evt;
  }

  goBack(){
    this._location.back();
  }

}
