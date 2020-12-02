import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { environment } from './../../../environments/environment'

@Component({
  selector: 'app-db-documents',
  templateUrl: './db-documents.component.html',
  styleUrls: ['./db-documents.component.scss']
})
export class DbDocumentsComponent implements OnInit {

  investor
	Note
  authService
  client_data
  in_arr
  client_id_
  constructor(private route: ActivatedRoute,private service:AuthService,private router:Router,private toastr: ToastrService) {
      this.authService = service;
   }


  ngOnInit() {
    this.getInvestor()
    this.client_id_ = this.route.snapshot.params.id;
  }

  getInvestor(){
  	var investor_data = JSON.parse(sessionStorage.getItem('investor'))

    var ob = {
      client_id: this.route.snapshot.params.id,
    };
    console.log(ob)
    this.authService.clientProfileData(ob).subscribe(data => {

      if (data) {
        console.log(data)
        this.client_data = data.data;
        
      }
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })

  	if (investor_data!=null) {
  		this.investor=investor_data
  		console.log(this.investor)

  	}
  }

  getSingleFiles(file){


    if(file == "investor_documents"){
        if(this.client_data && this.client_data.investor_documents.length){
          return environment.InvestorID+""+this.client_data.investor_documents[0].upload_id
        }else{
          return "--";
        }
    }else if(file == "DisclosureSign"){      
      if(this.client_data && this.client_data.DisclosureSign){
        return environment.InvestorSignBasePath+""+this.client_data.DisclosureSign;
      }else{
        return "--"
      }
    }else if(file == "RecordAdviceClientSignature"){
      if(this.client_data && this.client_data.RecordAdviceClientSignature){
        return environment.InvestorSignBasePath+""+this.client_data.RecordAdviceClientSignature;
      }else{
        return "--"
      }
    }
    else if(file == "RiskProfilerClientSignature"){
      if(this.client_data && this.client_data.RiskProfilerClientSignature){
        return environment.InvestorSignBasePath+""+this.client_data.RiskProfilerClientSignature;
      }else{
        return "--"
      }
    }else{
      return "";

    }


    console.log(file)
    if(file){
      return environment.InvestorSignBasePath+'/'+file;
    }else{
      return "javascript:;";
    }
  }

  getMultiple(array){
    console.log(array)
    if(array.length){
      return environment.InvestorID+"/"+array[0].upload_id;
    }else{
      return "javascript:;";
    }
  }

}
