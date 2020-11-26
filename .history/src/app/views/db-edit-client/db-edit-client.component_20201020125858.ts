import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from '../.././auth/auth.service';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

declare var $;
@Component({
  selector: 'app-db-edit-client',
  templateUrl: './db-edit-client.component.html',
  styleUrls: ['./db-edit-client.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})

export class DbEditClientComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  editableSign = false
  fileext

  children
  childrens
  beneficiary
  beneficiaries
  firstStepStatus = false;
  firstFormErrorCount = 0;
  childError = false;
  investor_id
  adviseTaken
  adviseTakenYes = false
  adviseTakenNo = false

  upload_id = []
  upload_id_label = ['Choose file'];

  DisclosureSign
  DisclosureDate
  DisclosureName
  DisclosureAgree = false;
  ThirdStepStatus = false;
  defaultImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtcAAAC1CAYAAACULdMlAAACFUlEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwJkBCTkAAbMzGX4AAAAASUVORK5CYII=`;


  // defaultShortImage=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAggAAACCCAYAAAAjSDD0AAABHUlEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADeDCD+AAEWEPbFAAAAAElFTkSuQmCC`;

  defaultShortImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd0AAAB3CAYAAABGzZpSAAAA80lEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADuBneQAAHKrbe6AAAAAElFTkSuQmCC`;

  RecordAdviceDate
  RecordAdviceClient
  RecordAdviceAdvisor
  RecordAdviceSummaryOfDiscussionWithClient
  RecordAdviceSummaryOfAdviceFromAdvisor
  RecordAdviceOfAdvisorTaken
  RecordAdviceOfAdvisorExplain = ""
  RecordAdviceClientSignature
  RecordAdviceAdvisorSignature
  ForthStepStatus = false;
  FifthStepStatus = false;
  list = [
      { "name": "Yes", ID: "D1" },
      { "name": "No", ID: "D2" }
  ]
  chosenItem = this.list[0].name;
  isFirstStepDone = false
  isSecondStepDone = false
  isThirdStepDone = false
  isForthStepDone = false
  isFifthStepDone = false
  Year1
  Year2
  Year3
  Year4
  Year5
  Year6
  // Year1=0
  // Year2=0
  // Year3=0
  // Year4=0
  // Year5=0
  // Year6=0
  YearTotal = 0
  RiskProfilerClientSignature
  RiskProfilerAdvisorSignature
  isEditable = false;
  opened = [];
  broker_id

  bank_list

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private toastr: ToastrService, public formBuilder: FormBuilder) { }

  ngOnInit() {

      const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
      this.broker_id = user.id
      console.log('broker_id:-', this.broker_id)
      const component = this;
      $(document).on('click', '.mat-step-header', function () {
          var step = $(this).attr('aria-posinset');
          console.log('step', step)

          if (step == 2) {
              component.visitToggle('1')
          }

          component.updateColor()

          for (var i = step; i > 0; i--) {
              component.visitToggle(i)
          }

          component.visitToggle(step)
          console.log(component.opened)

      });

      this.investor_id = this.route.snapshot.params.id;
      this.DisclosureSign = ''
      console.log('disclosure sign', this.DisclosureSign)

      // var date = new Date();

      // var day = date.getDate();
      // var month = date.getMonth() + 1;
      // var year = date.getFullYear();

      // if (month < 10) month = "0" + month;
      // if (day < 10) day = "0" + day;

      // var today = year + "-" + month + "-" + day;  
      // $('input[type=date]').val()
      // var today = moment().format('YYYY-MM-DD');
      // $('input[type=date]').val(today);

      // document.getElementById('datePicker').valueAsDate = new Date();
      let d = new Date();
      let currDate = d.getDate();
      let currMonth = d.getMonth() + 1;
      let currYear = d.getFullYear();
      let today = currYear + "-" + ((currMonth < 10) ? '0' + currMonth : currMonth) + "-" + ((currDate < 10) ? '0' + currDate : currDate);


      this.DisclosureDate = today
      this.RecordAdviceDate = today

      this.firstFormGroup = this.formBuilder.group({
          // firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this.formBuilder.group({
          // secondCtrl: ['', Validators.required]
      });
      this.thirdFormGroup = this.formBuilder.group({
          // secondCtrl: ['', Validators.required]
      });
      this.forthFormGroup = this.formBuilder.group({
          // secondCtrl: ['', Validators.required]
      });
      this.fifthFormGroup = this.formBuilder.group({
          // secondCtrl: ['', Validators.required]
      });

      $(".custom-file-input").on("change", function () {
          var fileName = $(this).val().split("\\").pop();
          $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
      });

      // getting bank list
      this.bank_lists();

      this.getClientProfile();

      
      this.children =
      {
          FullName: '',
          IdNumber: '',
          CellNumber: '',
          Email: ''
      };

    
      this.beneficiary =
      {
          FullName: '',
          Relationship: '',
          CellNumber: '',
          Percent: ''
      };
      this.setLeadFields()

  }
  bank_lists(){
      this.authService.bankList().subscribe(data => {
          console.log(data)
          // alert(data)

          if (data.success == 1) {

              this.bank_list = data.list;

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
  getClientProfile(){
      this.authService.singleInvestor({
          id : this.route.snapshot.params.id
      }).subscribe(data => {
          console.log(data)
          // alert(data)

          if (data.success == 1) {
                this.form.controls['LastName'].setValue(data.data.LastName);
                this.form.controls['FirstName'].setValue(data.data.FirstName);
                this.form.controls['IdNumber'].setValue(data.data.IdNumber);
                this.form.controls['CellNumber'].setValue(data.data.CellNumber);
                this.form.controls['Email'].setValue(data.data.Email);
                this.form.controls['HomeNumber'].setValue(data.data.HomeNumber);
                this.form.controls['WorkNumber'].setValue(data.data.WorkNumber);
                this.form.controls['HomeAddress'].setValue(data.data.HomeAddress);
                this.form.controls['PostalAddress'].setValue(data.data.PostalAddress);
                this.form.controls['TaxNumber'].setValue(data.data.TaxNumber);
                this.form.controls['MaritalStatus'].setValue(data.data.MaritalStatus);
                this.form.controls['BankName'].setValue(data.data.BankName);
                this.form.controls['BankNumber'].setValue(data.data.BankNumber);
                this.form.controls['AccountType'].setValue(data.data.AccountType);
                this.form.controls['Note'].setValue(data.data.Note);
                //add children

                this.form.controls['LastName2'].setValue(data.data.spouse_data.LastName);
                this.form.controls['FirstName2'].setValue(data.data.spouse_data.FirstName);
                this.form.controls['IdNumber2'].setValue(data.data.spouse_data.IdNumber);
                this.form.controls['CellNumber2'].setValue(data.data.spouse_data.CellNumber);
                this.form.controls['Email2'].setValue(data.data.spouse_data.Email);
                this.form.controls['HomeNumber2'].setValue(data.data.spouse_data.HomeNumber);
                this.form.controls['WorkNumber2'].setValue(data.data.spouse_data.WorkNumber);
                this.form.controls['HomeAddress2'].setValue(data.data.spouse_data.HomeAddress);
                this.form.controls['PostalAddress2'].setValue(data.data.spouse_data.PostalAddress);
                this.form.controls['TaxNumber2'].setValue(data.data.spouse_data.TaxNumber);
                // this.form.controls['MaritalStatus2'].setValue(data.data.spouse_data.MaritalStatus);
                this.form.controls['BankName2'].setValue(data.data.spouse_data.BankName);
                this.form.controls['BankNumber2'].setValue(data.data.spouse_data.BankNumber);
                this.form.controls['AccountType2'].setValue(data.data.spouse_data.AccountType);
                this.RecordAdviceSummaryOfDiscussionWithClient = data.data.RecordAdviceSummaryOfDiscussionWithClient;
                this.RecordAdviceSummaryOfAdviceFromAdvisor = data.data.RecordAdviceSummaryOfAdviceFromAdvisor;
                this.RecordAdviceDate = data.data.RecordAdviceDate;
                this.RecordAdviceAdvisor = data.data.RecordAdviceAdvisor;
                // this.form.controls['Note'].setValue(data.data.spouse_data.Note);
                // alert(this.RecordAdviceSummaryOfDiscussionWithClient)
                if(data.data.investor_childrens.length == 0){
                    this.childrens = [{
                        FullName: '',
                        IdNumber: '',
                        CellNumber: '',
                        Email: ''
                    },
                    {
                        FullName: '',
                        IdNumber: '',
                        CellNumber: '',
                        Email: ''
                    },
                    {
                        FullName: '',
                        IdNumber: '',
                        CellNumber: '',
                        Email: ''
                    }];
                }else{
                    this.childrens = [];

                    data.data.investor_childrens.forEach(element => {
                        this.childrens.push({
                            FullName: element.FullName,
                            IdNumber: element.IdNumber,
                            CellNumber: element.CellNumber,
                            Email: element.Email,
                        })
                    });
                }     
                
                
                if(data.data.investor_beneficiaries.length == 0){
                    this.beneficiaries = [{
                        FullName: '',
                        Relationship: '',
                        CellNumber: '',
                        Percent: ''
                    },
                    {
                        FullName: '',
                        Relationship: '',
                        CellNumber: '',
                        Percent: ''
                    },
                    {
                        FullName: '',
                        Relationship: '',
                        CellNumber: '',
                        Percent: ''
                    }];
                }else{
                    this.beneficiaries = [];

                    data.data.investor_beneficiaries.forEach(element => {
                        this.beneficiaries.push({
                            FullName: element.FullName,
                            Relationship: element.Relationship,
                            CellNumber: element.CellNumber,
                            Percent: element.Percent,
                        })
                    });
                }     

                // add Beneficiaries
                

          } else {
              this.toastr.error(data.message, 'Error');
          }
      }, err => {
          console.log(err)
          this.toastr.error(this.authService.COMMON_ERROR);

      })
  }
  setLeadFields() {

      var lead = JSON.parse(localStorage.getItem('lead'));

      if (lead !== null) {
          console.log(lead)
          this.form.controls['LastName'].setValue(lead.LastName);
          this.form.controls['FirstName'].setValue(lead.FirstName);
          this.form.controls['IdNumber'].setValue(lead.IdNumber);
          this.form.controls['CellNumber'].setValue(lead.CellNumber);
          this.form.controls['Email'].setValue(lead.Email);
          this.form.controls['HomeAddress'].setValue(lead.HomeAddress);
          this.form.controls['HomeNumber'].setValue(lead.HomeNumber);
          this.form.controls['MaritalStatus'].setValue(lead.MaritalStatus);
          this.form.controls['Note'].setValue(lead.Note);
      }
      // else{
      //     console.log(lead)
      // }

      // localStorage.removeItem('user');
  }

  ngAfterViewInit() {
      this.DisclosureSign = ''
      this.RecordAdviceClientSignature = ''
      this.RecordAdviceAdvisorSignature = ''
      this.RiskProfilerClientSignature = ''
      this.RiskProfilerAdvisorSignature = ''
  }

  ngOnDestroy() {
      localStorage.removeItem('lead');
      this.opened = []
  }

  ngOnChanges() {
      // changes.prop contains the old and the new value...
      console.log('change happens')
  }

  addChildren() {
      let obj = this.children;
      this.childrens.push(obj);
  }
  addBeneficiary() {
      let obj = this.beneficiary;
      this.beneficiaries.push(obj);
  }


  placeChangedCallback(evt: any) {
      console.log(evt)
  }
  form = new FormGroup({

      LastName: new FormControl('', [Validators.required, Validators.pattern('^[^ ]+[0-9a-zA-Z ]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      LastName2: new FormControl('', [Validators.pattern('^[^ ]+[0-9a-zA-Z ]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      FirstName: new FormControl('', [Validators.required, Validators.pattern('^[^ ]+[0-9a-zA-Z ]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      FirstName2: new FormControl('', [Validators.required, Validators.pattern('^[^ ]+[0-9a-zA-Z ]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      IdNumber: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      IdNumber2: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*'),

      Validators.minLength(1), Validators.maxLength(20)]),
      CellNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      CellNumber2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      Email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
      Email2: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')]),
      HomeNumber: new FormControl('', [Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      HomeNumber2: new FormControl('', [Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      WorkNumber: new FormControl('', [Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      WorkNumber2: new FormControl('', [Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(20)]),
      HomeAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 #,.]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      HomeAddress2: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 #,.]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      PostalAddress: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 #,.]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      PostalAddress2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 #,.]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      TaxNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      TaxNumber2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      MaritalStatus: new FormControl(''),
      BankName: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      BankName2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      BankNumber: new FormControl('', [Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      BankNumber2: new FormControl('', [Validators.pattern('^[0-9]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      AccountType: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      AccountType2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
      Validators.minLength(1), Validators.maxLength(60)]),
      Note: new FormControl('', [
          Validators.minLength(1), Validators.maxLength(255)]),
      // TaxNumber

  });

  form2 = new FormGroup({
      // LastName: new FormControl(''),
  });



  get LastName() { return this.form.get('LastName'); }
  get LastName2() { return this.form.get('LastName2'); }
  get FirstName() { return this.form.get('FirstName'); }
  get FirstName2() { return this.form.get('FirstName2'); }
  get IdNumber() { return this.form.get('IdNumber'); }
  get IdNumber2() { return this.form.get('IdNumber2'); }
  get CellNumber() { return this.form.get('CellNumber'); }
  get CellNumber2() { return this.form.get('CellNumber2'); }
  get Email() { return this.form.get('Email'); }
  get Email2() { return this.form.get('Email2'); }
  get HomeNumber() { return this.form.get('HomeNumber'); }
  get HomeNumber2() { return this.form.get('HomeNumber2'); }
  get WorkNumber() { return this.form.get('WorkNumber'); }
  get WorkNumber2() { return this.form.get('WorkNumber2'); }
  get HomeAddress() { return this.form.get('HomeAddress'); }
  get HomeAddress2() { return this.form.get('HomeAddress2'); }
  get PostalAddress() { return this.form.get('PostalAddress'); }
  get PostalAddress2() { return this.form.get('PostalAddress2'); }
  get TaxNumber() { return this.form.get('TaxNumber'); }
  get TaxNumber2() { return this.form.get('TaxNumber2'); }
  get MaritalStatus() { return this.form.get('MaritalStatus'); }
  get BankName() { return this.form.get('BankName'); }
  get BankName2() { return this.form.get('BankName2'); }
  get BankNumber() { return this.form.get('BankNumber'); }
  get BankNumber2() { return this.form.get('BankNumber2'); }
  get AccountType() { return this.form.get('AccountType'); }
  get AccountType2() { return this.form.get('AccountType2'); }
  get Note() { return this.form.get('Note'); }
  get checkSpouse() { return (this.LastName2.value != ''); }
  get firstStep() { return this.firstStepStatus; }
  get thirdStep() { return this.ThirdStepStatus; }
  get forthStep() { return this.ForthStepStatus; }
  get fifthStep() { return this.FifthStepStatus; }
  get advisorRequired() { return (this.chosenItem == 'Yes'); }


  form3 = new FormGroup({
      // DisclosureName: new FormControl('', Validators.required),
      // DisclosureDate: new FormControl('', Validators.required),
      // DisclosureSign: new FormControl('', Validators.required),
      // DisclosureAgree: new FormControl('', Validators.required),
  });

  DisclosureForm = new FormGroup({
      // DisclosureName: new FormControl(this.DisclosureName, [Validators.required,Validators.maxLength(4)]),
      // DisclosureDate: new FormControl(this.DisclosureDate, [Validators.required,Validators.maxLength(4)]),
      // DisclosureAgree: new FormControl(this.DisclosureAgree, [Validators.required]),

  });


  public firstForm(stepper: MatStepper) {

      this.firstStepStatus = true;


      // this.changeIconColor(1,this.isFirstStepDone)

      var check = this.checkFirstFormValidity();

      if (check) {
          // this.visitToggle('1')
          // this.updateColor()
          this.isFirstStepDone = true
          // this.visitToggle('1')
          // this.updateColor()
          if (this.investor_id != null || this.investor_id != undefined) {
              console.log('update');

              var ob = { id: this.investor_id, form: this.form.value, children: this.childrens, beneficiaries: this.beneficiaries };

              this.authService.updateInvestor(ob).subscribe(data => {

                  if (data.success == 1) {

                      this.investor_id = data.data.id;
                      console.log(this.investor_id);

                      this.DisclosureName = this.FirstName.value + ' ' + this.LastName.value;
                      console.log(this.DisclosureName);

                      // stepper.next();
                      this.stepperNextAsyc(stepper, '1')
                      // this.visitToggle('1')
                      // this.updateColor()

                  } else {
                      this.toastr.error(data.message, 'Error');
                  }
              }, err => {
                  console.log(err)
                  this.toastr.error(this.authService.COMMON_ERROR);

              })

          } else {

              console.log('create');

              var obj = { broker_id: this.broker_id, form: this.form.value, children: this.childrens, beneficiaries: this.beneficiaries };
              console.log(obj);
              this.authService.addInvestor(obj).subscribe(data => {

                  if (data.success == 1) {

                      this.investor_id = data.data.id;
                      console.log(this.investor_id);
                      this.DisclosureName = this.FirstName.value + ' ' + this.LastName.value;
                      console.log(this.DisclosureName);

                      localStorage.removeItem('lead');

                      // stepper.next();

                      this.stepperNextAsyc(stepper, '1')


                  } else {
                      this.toastr.error(data.message, 'Error');
                  }
              }, err => {
                  console.log(err)
                  // this.toastr.error(this.authService.COMMON_ERROR);

              })
              // this.visitToggle('1')
              // this.updateColor()
          }

          // return

          // stepper.next();
      }
  }

  // UploadId
  public secondForm(stepper: MatStepper) {

      // stepper.next();
      console.log('scnd');
      // console.log('invertor_id--------',this.investor_id);

      var formdata: FormData = new FormData();
      formdata.append("id", this.investor_id);
      console.log(this.upload_id);

      this.upload_id.forEach(function (val, ind) {


          formdata.append("image", val);

      })

      // console.log(formdata.getAll(image));
      

      if (this.upload_id == null) {
          this.toastr.warning('Please upload atleast one document', 'Warning')
          return
      }
      var ext = this.fileext;


      if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'pdf') {
          //
      } else {
          this.toastr.warning('Please select valid file', 'warning')
          return

      }




      if (this.investor_id == null || this.investor_id == undefined) {
          this.toastr.warning('Please complete form 1 first', 'Warning')
          return
      }
      this.isSecondStepDone = true;
      // console.log(formdata);
      // -----------------------
      // stepper.next();
      // this.DisclosureSign=null;
      // return is to stop
      // return
      // -------------------

      // addInvestorSecondForm
      this.authService.addInvestorSecondForm(formdata).subscribe(data => {
          console.log(data)
          // alert(data)

          if (data.success == 1) {

              this.investor_id = data.data.id;

              // console.log(data);
              // stepper.next();
              this.stepperNextAsyc(stepper, '2')


          } else {
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

      this.fileext = ext;
      if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'pdf') {
          // code...
          this.upload_id.push(file);
          // console.log(this.upload_id)
          // this.upload_id.push(evt.target.files[0]);

          console.log(this.upload_id);
          // console.log(this.upload_id[0].name);
          var key = this.upload_id.length - 1
          console.log('length------------', this.upload_id.length)
          console.log('key------------', key)


          if (key == 0) {
              this.upload_id_label.pop()
          }
          this.upload_id_label.push(this.upload_id[key].name);
          console.log('label------------', this.upload_id_label)



          const fr = new FileReader();
          fr.onloadend = (loadEvent) => {
              let mainImage = fr.result;
              //this.serviceDoc = mainImage;
          };
          fr.readAsDataURL(file);
          // this.imageUpload("sample")
      } else {
          evt.target.value = ""
          this.toastr.warning('Please select valid file', 'warning');
      }


  }


  checkFirstFormValidity() {

      var status = true;
      if (this.LastName.invalid || this.FirstName.invalid || this.IdNumber.invalid || this.CellNumber.invalid || this.Email.invalid || this.HomeNumber.invalid || this.WorkNumber.invalid || this.HomeAddress.invalid || this.PostalAddress.invalid || this.TaxNumber.invalid || this.BankName.invalid || this.BankNumber.invalid || this.AccountType.invalid || this.Note.invalid) {

          return status = false;


      } else if (this.LastName2.value != '') {
          // status=false;
          if (this.FirstName2.invalid || this.IdNumber2.invalid || this.CellNumber2.invalid || this.Email2.invalid || this.HomeNumber2.invalid || this.WorkNumber2.invalid || this.HomeAddress2.invalid || this.PostalAddress2.invalid || this.TaxNumber2.invalid || this.BankName2.invalid || this.BankNumber2.invalid || this.AccountType2.invalid) {

              status = false;
          }

      } else {

          var checkchild = this.checkChildValidity();
          var checkbene = this.checkBeneficiaryValidity();
          console.log('in');

          if (!checkchild) {
              status = false;
          }
          if (!checkbene) {
              status = false;
          }

      }
      return status;
  }

  checkChildValidity() {

      var status = true;
      var length = this.childrens.length;

      for (var i = 0; i < length; i++) {
          if (this.childrens[i].FullName != '') {
              if (this.childrens[i].IdNumber == '' || this.childrens[i].CellNumber == '' || this.childrens[i].Email == '') {
                  return false;
              }
          }
      }
      return status;
  }
  checkBeneficiaryValidity() {

      var status = true;
      var length = this.beneficiaries.length;

      for (var i = 0; i < length; i++) {
          if (this.beneficiaries[i].FullName != '') {
              if (this.beneficiaries[i].Relationship == '' || this.beneficiaries[i].CellNumber == '' || this.beneficiaries[i].Percent == '') {
                  return false;
              }
          }
      }
      return status;
  }

  checkChildError(i, v) {

      // console.log(i);
      if (i != '' && v == '') {
          this.childError = true;
          return true;
      } else {
          this.childError = false;
          return false;
      }
  }

  public thirdForm(stepper: MatStepper) {

      this.ThirdStepStatus = true;

      console.log('third');

      var agree = 'no';

      // this.DisclosureName.trim();
      if (this.DisclosureName != '' && this.DisclosureDate != '') {
          agree = 'yes';
          var formdata: FormData = new FormData();
          formdata.append("id", this.investor_id);
          formdata.append("DisclosureSign", this.DisclosureSign);
          formdata.append("DisclosureDate", this.DisclosureDate);
          formdata.append("DisclosureName", this.DisclosureName);
          formdata.append("DisclosureAgree", agree);

          formdata.append("image", this.DisclosureSign);

          console.log('disclosuresign', this.DisclosureSign)

          if (this.DisclosureSign == '') {
              this.toastr.warning('Please sign the disclosure', 'Warning')
              return
          }
          if (this.investor_id == null || this.investor_id == undefined) {
              this.toastr.warning('Please complete form 1 first', 'Warning')
              return
          }

          this.isThirdStepDone = true;

          this.authService.addInvestorThirdForm(formdata).subscribe(data => {

              // console.log('in');
              if (data.success == 1) {

                  console.log(data);
                  // stepper.next();
                  this.stepperNextAsyc(stepper, '3')

              } else {
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

  DisclosureSignUpload(evt: any) {
      // console.log(evt)
      this.DisclosureSign = evt;

  }

  public forthForm(stepper: MatStepper) {

      this.ForthStepStatus = true;
      console.log('forth');

      this.RecordAdviceOfAdvisorTaken = this.chosenItem;

      var validate = this.validateForthForm();
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

          console.log(this.defaultShortImage)

          if (this.RecordAdviceClientSignature == '') {
              this.toastr.warning('Please sign the client signature', 'Warning')
              return
          }
          // console.log(this.RecordAdviceAdvisorSignature)
          if (this.RecordAdviceAdvisorSignature == '' && this.chosenItem == 'Yes') {
              this.toastr.warning('Please sign the advisor signature', 'Warning')
              return
          }

          if (this.investor_id == null || this.investor_id == undefined) {
              this.toastr.warning('Please complete form 1 first', 'Warning')
              return
          }
          this.isForthStepDone = true;
          console.log('go');

          this.authService.addInvestorForthForm(formdata).subscribe(data => {

              // console.log('in');
              if (data.success == 1) {

                  console.log(data);
                  // stepper.next();
                  this.stepperNextAsyc(stepper, '4')
                  // this.DisclosureSign=null;

              } else {
                  // this.toastr.error(data.message, 'Error');
              }
          }, err => {
              console.log(err)
              // this.toastr.error(this.authService.COMMON_ERROR);

          })

      }

  }
  goBack(stepper: MatStepper) {
      console.log('back in');
      stepper.previous();
  }
  validateForthForm() {

      var status = false;
      this.chosenItem == this.RecordAdviceOfAdvisorTaken;


      if (this.RecordAdviceOfAdvisorTaken == 'No') {

          if (this.RecordAdviceDate != null && this.RecordAdviceClient != null && this.RecordAdviceSummaryOfDiscussionWithClient != null && this.RecordAdviceOfAdvisorExplain != null) {


              status = true;
              console.log('first if')

              // console.log('go');

          }
      } else {


          if (this.RecordAdviceDate != null && this.RecordAdviceClient != null && this.RecordAdviceAdvisor != null && this.RecordAdviceSummaryOfDiscussionWithClient != null && this.RecordAdviceSummaryOfAdviceFromAdvisor != null) {



              status = true;
              console.log('go');
              console.log('second if')

          }
      }
      return status;
  }

  checkCond(cond) {
      if (cond == this.adviseTaken) {
          return true;
      }

      return false;
  }



  ClientSignUpload(evt: any) {
      // console.log(evt);
      this.RecordAdviceClientSignature = evt;
  }
  AdvisorSignUpload(evt: any) {
      this.RecordAdviceAdvisorSignature = evt;
  }

  adviceTaken(evt: any) {
      // console.log(evt);
      this.adviseTaken = evt;
  }

  chosenItemStatus() {
      if (this.chosenItem == 'No') {
          return true;
      } else {
          return false;
      }
  }


  public fifthForm() {
      console.log('fifth');

      this.FifthStepStatus = true;

      if (this.Year1 == '' || this.Year1 == null) {
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


      if (this.Year1 == 0 || this.Year2 == 0 || this.Year3 == 0 || this.Year4 == 0 || this.Year5 == 0 || this.Year6 == 0) {
          this.toastr.warning('Year % should be greater than 0')
          return
      }

      if (this.YearTotal != 100) {
          this.toastr.warning('Total should be 100%')
          return
      }

      if (this.RiskProfilerClientSignature == '') {
          this.toastr.warning('Please sign the client signature', 'Warning')
          return
      }

      if (this.RiskProfilerAdvisorSignature == '' && this.chosenItem == 'Yes') {
          this.toastr.warning('Please sign the advisor signature', 'Warning')
          return
      }

      this.isFifthStepDone = true

      if (this.investor_id == null || this.investor_id == undefined) {
          this.toastr.warning('Please complete form 1 first', 'Warning')
          return
      }

      if (!this.isSecondStepDone) {
          this.toastr.warning('Please complete step 2 first', 'Warning')
          return
      }
      if (!this.isThirdStepDone) {
          this.toastr.warning('Please complete step 3 first', 'Warning')
          return
      }
      if (!this.isForthStepDone) {
          this.toastr.warning('Please complete step 4 first', 'Warning')
          return
      }

      this.authService.addInvestorFifthForm(formdata).subscribe(data => {

          // console.log('in');
          if (data.success == 1) {

              console.log(data);
              this.toastr.success(data.message);
              this.router.navigate(['/user/dbClients']);


          } else {
              // this.toastr.error(data.message, 'Error');
          }
      }, err => {
          console.log(err)
          // this.toastr.error(this.authService.COMMON_ERROR);

      })


  }

  getYearTotal() {
      // p
      if (isNaN(this.Year1)) {
          this.Year1 = 0;
      }
      if (isNaN(this.Year2)) {
          this.Year2 = 0;
      }
      if (isNaN(this.Year3)) {
          this.Year3 = 0;
      }
      if (isNaN(this.Year4)) {
          this.Year4 = 0;
      }
      if (isNaN(this.Year5)) {
          this.Year5 = 0;
      }
      if (isNaN(this.Year6)) {
          this.Year6 = 0;
      }
      this.YearTotal = Number(this.Year1) + Number(this.Year2) + Number(this.Year3) + Number(this.Year4) + Number(this.Year5) + Number(this.Year6);
      if (isNaN(this.YearTotal)) {
          this.YearTotal = 0;
          console.log(this.YearTotal)
      } else {
          console.log(this.YearTotal)
      }
      // this.YearTotal= YearTotals;
  }

  RiskClientSignUpload(evt: any) {
      // console.log(evt);
      this.RiskProfilerClientSignature = evt;
  }
  RiskAdvisorSignUpload(evt: any) {
      this.RiskProfilerAdvisorSignature = evt;
  }


  changeIconColor(step, status) {

      var newstep = step - 1
      // var status = this.isFirstStepDone
      $('.mat-step-icon').each(function (index, element) {
          // var html = $(this).html();
          if (index == newstep) {
              console.log(newstep, 'status-------' + status)
              if (status) {
                  $(this).removeClass('orange_class').addClass('green_class')
                  if ($(this).hasClass('green_class')) {
                      // code...
                      console.log('set in greeen class')
                  }
              } else {
                  $(this).removeClass('green_class').addClass('orange_class')
              }
              // code...
              // alert(index);
          }

      })

  }

  updateColor() {
      console.log('in the update color')
      const component = this

      this.opened.forEach(function (item, index) {
          console.log('array' + index, item)
          if (item == 1) {
              component.changeIconColor(item, component.isFirstStepDone)
          } else if (item == 2) {
              component.changeIconColor(item, component.isSecondStepDone)
          } else if (item == 3) {
              component.changeIconColor(item, component.isThirdStepDone)
          } else if (item == 4) {
              component.changeIconColor(item, component.isForthStepDone)
          } else {
              component.changeIconColor(item, component.isFifthStepDone)
          }
      })
  }

  visitToggle(id) {
      // const index = this.opened.indexOf(id);
      console.log('in the visit')
      if (!this.opened.includes(id)) {
          this.opened.push(id);
      }
      // else {
      //         this.opened.push(id);
      // }
  }

  stepperNextAsyc(stepper, step) {
      // await stepper.next()
      this.stepperNextTo(stepper).then(data => {

          this.visitToggle(step)
          // this.updateColor()

      })

      // if (response) {
      //     // alert(response)
      //     this.visitToggle(step)
      //     this.updateColor()
      // }
  }

  async stepperNextTo(stepper) {
      await stepper.next();
      return '1';
  }

  selectionChange(evt: any) {
      console.log('select change')
      const component = this
      var count = 1
      var interval = setInterval(function () {
          count++
          component.updateColor()
          if (count == 8) {
              clearInterval(interval);
          }
          console.log("Hello");
      }, 250);

  }
}
