import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-db-add-id',
  templateUrl: './db-add-id.component.html',
  styleUrls: ['./db-add-id.component.scss']
})
export class DbAddIdComponent implements OnInit {
	investor_id
	investor
	upload_id=[]
    upload_id_label = ['Choose file']
    title='Add Id'
    fileext
  constructor(private _location: Location,private route : ActivatedRoute, private authService:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
  	this.getInvestor()
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
          this.investor_id= atob(this.route.snapshot.params.investor_id)          

      }
    }, err => {
      console.log(err)
      // If not token provided or token invalid
      this.authService.showAuthError(err);
      //this.toastr.error(err.message);
      // this.toastr.error(this.authService.COMMON_ERROR);
    })
  }

  

  public add(){

      // stepper.next();
      console.log('scnd');
      // console.log('invertor_id--------',this.investor_id);

      var formdata: FormData = new FormData();
      formdata.append("id", this.investor_id);

      this.upload_id.forEach(function(val,ind){
          
     
              formdata.append("image", val);

       })

      if(this.upload_id==null){
          this.toastr.warning('Please upload atleast one document','Warning')
          return
      }
      var ext= this.fileext;

      
      if(ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'pdf'){
          //
      }else{
          this.toastr.warning('Please select valid file','warning')
          return

      }


      

      if (this.investor_id==null || this.investor_id==undefined) {
          this.toastr.error('Something went wrong, Please try again later','Error')
          return
      }
      // this.isSecondStepDone=true;
      
      // addInvestorSecondForm
      this.authService.addInvestorSecondForm(formdata).subscribe(data => {
          console.log(data)
          // alert(data)
          
          if (data.success == 1) {
              
              this.investor_id = data.data.id;
              
              console.log('success')

              var investor_data = data.data
              sessionStorage.setItem('investor',JSON.stringify(investor_data))
              
              this.toastr.success('Id added successfully')
              this._location.back();
              // console.log(data);
              // stepper.next();
              // this.stepperNextAsyc(stepper,'2')
              

          }else  {
              // this.toastr.error(data.message, 'Error');
          }
      }, err => {
              console.log(err)
              // this.toastr.error(this.authService.COMMON_ERROR);
          
      })
      return
  }

  serviceIdUpload(evt: any) {
      // this.fileToUpload = ''

      // console.log(evt);

      if (!evt.target) {
        return;
      }
      if (!evt.target.files) {
        return;
      }
      if (evt.target.files.length !== 1) {
        return;
      }
      // this.upload_id = [];
      const file = evt.target.files[0];
      var img_arr = file.name.split('.');

      var ext = img_arr.pop();

      this.fileext=ext;
      if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'pdf' ) {
          // code...
          this.upload_id.push(file);
          // console.log(this.upload_id)
          // this.upload_id.push(evt.target.files[0]);

          console.log(this.upload_id);
          // console.log(this.upload_id[0].name);
          var key = this.upload_id.length-1
          console.log('length------------',this.upload_id.length)
          console.log('key------------',key)


          if (key==0) {
              this.upload_id_label.pop()
          }
          this.upload_id_label.push(this.upload_id[key].name);
          console.log('label------------',this.upload_id_label)
          


          const fr = new FileReader();
          fr.onloadend = (loadEvent) => {
            let mainImage = fr.result;
            //this.serviceDoc = mainImage;
          };
          fr.readAsDataURL(file);
          // this.imageUpload("sample")
      }else{
          evt.target.value=""
          this.toastr.warning('Please select valid file','warning');
      }

      
  }

  goBack(){
    this._location.back();
  }

}
