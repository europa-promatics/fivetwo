import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from '../.././auth/auth.service';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
import { Subscription, Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
// import * as moment from "moment";
import { environment } from "./../../../environments/environment"
import { CanComponentDeactivate } from 'src/app/user/deactivate_guard.service';

declare var Tesseract;


function id() {

}

function IdNumberValidator(control: FormControl) {
    let value = control.value;
    // if (email && email.indexOf("@") != -1) {
    //   let [_, domain] = email.split("@");
    //   if (domain !== "codecraft.tv") {
    //     return {
    //       emailDomain: {
    //         parsedDomain: domain
    //       }
    //     }
    //   }
    // }

    if (za(value)) {
        return null;
    } else {
        return {
            IDNumber: {
                parsedDomain: "rt"
            }
        }
    }

    return {
        emailDomain: {
            parsedDomain: "rt"
        }
    }
    id();

    return null;
}

function taxValidate(control: FormControl) {
    let value = control.value;
    var arr = [];
    if (value.toString()) {
        arr = Array.from(value.toString());
    } else {
        arr = [];
    }

    if (arr.length != 10) { //make sure have 10 digits
        return {
            taxNumber: {
                parsedDomain: tempTotal
            }
        }
    }

    var total = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            var val = parseInt(arr[i]);
        } else {
            var val = 4;
        }

        // we will muliply if number is even; otherwise leave as it is.
        if (i % 2 == 0) {
            var temp = val * 2; // if temp value have grater than 9 then we will add 2 number . for eg : 10 => 1 + 0 = 1
            if (temp > 9) {
                var more = temp.toString();
                var arrMore = Array.from(more);
                total = total + (parseInt(arrMore[0]) + parseInt(arrMore[1])) // 10 => 1 + 0 = 1
            } else {
                total = total + temp; // otherwise add in total
            }
        } else {
            total = total + val; //add in total
        }
    }

    if (total > 9) {
        var tempTotal = total.toString();

        var lastDigit = parseInt(Array.from(tempTotal)[1]);
        if (lastDigit == 0) { // compare last digit. digit must be == 0
            console.log("valid")
            return null;
        } else {
            console.log("Not valid")
            return {
                taxNumber: {
                    parsedDomain: tempTotal
                }
            }
        }
    } else {
        if (total == 0) {
            console.log("valid")
            return null;
        } else {
            console.log("Not valid")
            return {
                taxNumber: {
                    parsedDomain: tempTotal
                }
            }
        }
    }

    console.log(total)
    return null;
}

declare var $;

// interface children {
//     FullName?: string;
//     IdNumber?: string;
//     CellNumber?: string;
//     Email?: string;
// }

@Component({
    selector: 'app-db-add-investor',
    templateUrl: './db-add-investor.component.html',
    styleUrls: ['./db-add-investor.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
    }]
})


export class DbAddInvestorComponent implements OnInit, CanComponentDeactivate {
    webCam: boolean;
    webCamOpenedBY;
    webcamImage
    BankwebcamImage
    AddresswebcamImage
    bankDetailImage
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
    bank_upload_id = 'Choose File'
    address_upload_id = 'Choose File'
    DisclosureSign
    DisclosureDate
    DisclosureName
    DisclosureAgree = false;
    ThirdStepStatus = false;
    defaultImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtcAAAC1CAYAAACULdMlAAACFUlEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwJkBCTkAAbMzGX4AAAAASUVORK5CYII=`;

    errorClass = ""

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
    bankDetailStepDone = false
    addressStepDone = false
    isThirdStepDone = false
    isForthStepDone = false
    isFifthStepDone = false
    Year1
    Year2
    Year3
    Year4
    Year5
    Year6
    Relationship = ['son', 'daughter']
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
    BROKER

    bank_list



    @ViewChild('stepper', { static: true }) stepper: MatStepper;
    public showWebcam = true;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public allowCameraSwitch1 = true
    public deviceId: string;
    public videoOptions: MediaTrackConstraints = {
        // width: {ideal: 1024},
        // height: {ideal: 576}
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService,
        public formBuilder: FormBuilder
    ) {
        // this.test()
    }
    [x: string]: any;
    CanDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        return confirm("WARNING: Are you sure you want to leave the ‘Add Client’ page?");
    }

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

        this.childrens = [{
            FullName: '',
            IdNumber: '',
            CellNumber: '',
            Email: '',
            relation: '',
            isChecked: false
        },
        {
            FullName: '',
            IdNumber: '',
            CellNumber: '',
            Email: '',
            relation: '',
            isChecked: false
        },
        {
            FullName: '',
            IdNumber: '',
            CellNumber: '',
            Email: '',
            relation: '',
            isChecked: false
        }];
        this.children =
        {
            FullName: '',
            IdNumber: '',
            CellNumber: '',
            Email: '',
            relation: '',
            isChecked: false
        };

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
        this.beneficiary =
        {
            FullName: '',
            Relationship: '',
            CellNumber: '',
            Percent: ''
        };
        this.setLeadFields()
        this.BROKER = this.authService.getLoggedUserDetails();
        console.log("Broker -> ", this.BROKER)
        // this.RecordAdviceAdvisor = "Marthunis Oosthuizen";
        this.RecordAdviceAdvisor = this.BROKER.full_name;

    }
    bank_lists() {
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

    private trigger: Subject<void> = new Subject<void>();
    private triggerBank: Subject<void> = new Subject<void>();
    private triggerAddress: Subject<void> = new Subject<void>();


    private triggerUpdate: Subject<void> = new Subject<void>();

    public get triggerObservableUpdate(): Observable<void> {
        return this.triggerUpdate.asObservable();
    }

    public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }
    public get triggerBankObservable(): Observable<void> {
        return this.triggerBank.asObservable();
    }

    public get triggerAddressObservable(): Observable<void> {
        return this.triggerAddress.asObservable();
    }
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

    triggerSnapshot() {
        console.log("===working====upload")
        this.trigger.next();
        // this.webCam = false;
    }

    triggerBankSnapshot() {
        console.log("===working====upload")
        this.triggerBank.next();
        // this.webCam = false;
    }

    triggerAddressSnapshot() {
        console.log("===working====upload")
        this.triggerAddress.next();
    }

    triggerSnapshotUpdate() {
        console.log("===working====capture")

        this.triggerUpdate.next();
        // this.webCam = false;
    }

    public get nextWebcamObservable(): Observable<boolean | string> {
        return this.nextWebcam.asObservable();
    }

    uploadId() {
        $('#pict_modal').modal('hide');
    }

    uploadBankImg() {
        $('#bank_modal').modal('hide');
    }
    uploadAddressImg() {
        $('#address_modal').modal('hide');
    }
    recapture() {
        this.webcamImage = ""
    }

    handleImage(webcamImage) {
        this.webcamImage = webcamImage._imageAsDataUrl
        const object = {
            // id: this.dispensedPatientSelected.id,
            image: webcamImage._imageAsDataUrl
        };
    }

    recaptureBank() {
        this.BankwebcamImage = ""
    }

    handleBankImage(BankwebcamImage) {
        this.BankwebcamImage = BankwebcamImage._imageAsDataUrl
        const object = {
            // id: this.dispensedPatientSelected.id,
            image: BankwebcamImage._imageAsDataUrl
        };
    }

    handleAddressImage(AddresswebcamImage) {
        this.AddresswebcamImage = AddresswebcamImage._imageAsDataUrl

    }

    recaptureAddress() {
        this.AddresswebcamImage = ""
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
            this.DisclosureName = lead.FirstName + " " + lead.LastName
            this.RecordAdviceClient = lead.FirstName + " " + lead.LastName
            // this.DisclosureName = lead.FirstName + "" + lead.LastName

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
        let obj1 = this.beneficiary;
        this.beneficiaries.push(obj1);
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
        IdNumber: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9]*'),
            Validators.minLength(1),
            Validators.maxLength(20),
            IdNumberValidator,
        ]),
        IdNumber2: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9]*'),
            Validators.minLength(1), Validators.maxLength(20),
            IdNumberValidator,
        ]),
        CellNumber: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*'),
            Validators.minLength(10),
            Validators.maxLength(10)
        ]),
        CellNumber2: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*'),
            Validators.minLength(10),
            Validators.maxLength(10)]),
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
        // HomeAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 #,.]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        // HomeAddress2: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 #,.]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        // PostalAddress: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 #,.]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        // PostalAddress2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 #,.]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        TaxNumber: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*'),
            Validators.minLength(10),
            Validators.maxLength(10),
            taxValidate
        ]),
        TaxNumber2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*'),
        Validators.minLength(1), Validators.maxLength(60)]),
        MaritalStatus: new FormControl(''),
        // BankName: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        // BankName2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        // BankNumber: new FormControl('', [
        //     Validators.required,
        //     Validators.pattern('^[0-9]*'),
        //     Validators.minLength(1),
        //     Validators.maxLength(60)
        // ]),
        // BankNumber2: new FormControl('', [Validators.pattern('^[0-9]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        // AccountType: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        // AccountType2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        Note: new FormControl('', [
            Validators.minLength(1), Validators.maxLength(255)]),
        // TaxNumber

    });

    form7 = new FormGroup({
        HomeAddress: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 #,.]*'),
        Validators.minLength(1), Validators.maxLength(60)]),
        // HomeAddress2: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 #,.]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        PostalAddress: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 #,.]*'),
        Validators.minLength(1), Validators.maxLength(60)]),
        // PostalAddress2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 #,.]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),

    });

    form8 = new FormGroup({
        BankName: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
        Validators.minLength(1), Validators.maxLength(60)]),
        // BankName2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        BankNumber: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*'),
            Validators.minLength(1),
            Validators.maxLength(60)
        ]),
        // BankNumber2: new FormControl('', [Validators.pattern('^[0-9]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),
        AccountType: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
        Validators.minLength(1), Validators.maxLength(60)]),
        // AccountType2: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ,]*'),
        // Validators.minLength(1), Validators.maxLength(60)]),

    })

    form2 = new FormGroup({
        // LastName: new FormControl(''),
    });

    get HomeAddress() { return this.form7.get('HomeAddress'); }
    // get HomeAddress2() { return this.form.get('HomeAddress2'); }
    get PostalAddress() { return this.form7.get('PostalAddress'); }
    // get PostalAddress2() { return this.form.get('PostalAddress2'); }
    get BankName() { return this.form8.get('BankName'); }
    // get BankName2() { return this.form.get('BankName2'); }
    get BankNumber() { return this.form8.get('BankNumber'); }
    // get BankNumber2() { return this.form.get('BankNumber2'); }
    get AccountType() { return this.form8.get('AccountType'); }
    // get AccountType2() { return this.form.get('AccountType2'); }
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
    get TaxNumber() { return this.form.get('TaxNumber'); }
    get TaxNumber2() { return this.form.get('TaxNumber2'); }
    get MaritalStatus() { return this.form.get('MaritalStatus'); }
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

    showName() {
        this.RecordAdviceClient = this.form.value.FirstName + " " + this.form.value.LastName;
        this.DisclosureName = this.form.value.FirstName + " " + this.form.value.LastName;
        // console.log()
        this.RecordAdviceAdvisor = this.BROKER.full_name;
    }


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

                var ob = { id: this.investor_id, form: this.form.value, children: this.childrens, beneficiaries: this.childrens };

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
                })
                // this.visitToggle('1')
                // this.updateColor()
            }

            // return

            // stepper.next();
        }
    }

    public DraftfirstForm(stepper: MatStepper) {
        // this.firstStepStatus = true;
        this.isFirstStepDone = true

        if (this.investor_id != null || this.investor_id != undefined) {
            console.log('update');

            var ob = { id: this.investor_id, form: this.form.value, children: this.childrens, beneficiaries: this.childrens };

            this.authService.updateInvestor(ob).subscribe(data => {

                if (data.success == 1) {

                    this.investor_id = data.data.id;
                    console.log(this.investor_id);
                    this.DisclosureName = this.FirstName.value + ' ' + this.LastName.value;
                    this.stepperNextAsyc(stepper, '1')

                } else {
                    this.toastr.error(data.message, 'Error');
                }
            }, err => {
                console.log(err)
                this.toastr.error(this.authService.COMMON_ERROR);

            })

        } else {
            var obj = { broker_id: this.broker_id, form: this.form.value, children: this.childrens, beneficiaries: this.beneficiaries };
            console.log(obj);
            this.authService.addDraftInvestor(obj).subscribe(data => {
                console.log("====", data)
                if (data.success == 1) {

                    this.investor_id = data.data.id;
                    console.log(this.investor_id);
                    this.DisclosureName = this.FirstName.value + ' ' + this.LastName.value;
                    console.log(this.DisclosureName);

                    localStorage.removeItem('lead');

                    this.stepperNextAsyc(stepper, '1')


                } else {
                    this.toastr.error(data.message, 'Error');
                }
            }, err => {
                console.log(err)

            })
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
        if (this.webcamImage) {
            formdata.append("webcam_image", this.webcamImage);
        }

        // console.log(formdata.getAll(image));


        if (this.upload_id == null || !this.webcamImage) {
            this.toastr.warning('Please upload atleast one document', 'Warning')
            return
        }

        var ext = this.fileext;


        // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'pdf') {
        //     //
        // } else {
        //     this.toastr.warning('Please select valid file', 'warning')
        //     return
        // }

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

    public BankDetailsForm(stepper: MatStepper) {
        var formdata: FormData = new FormData();
        formdata.append("id", this.investor_id);
        console.log(this.bank_upload_id);
        if (this.BankName.invalid || this.BankNumber.invalid || this.AccountType.invalid ) {
            this.toastr.warning('Please fill bank details', 'Warning')
            return
        }else{
            formdata.append("BankName", this.BankName.value)
            formdata.append("BankNumber", this.BankNumber.value);
            formdata.append("AccountType", this.AccountType.value);
        }
        if (this.bank_upload_id) {
            formdata.append("image", this.bank_upload_id);
        }
        if (this.BankwebcamImage) {
            formdata.append("webcam_image", this.BankwebcamImage);
        }
        console.log("Bank --->" + !this.bank_upload_id);
        console.log("Bank Web --->" + !this.BankwebcamImage);

        if (this.bank_upload_id == "Choose File" && !this.BankwebcamImage) {
            this.toastr.warning('Please upload atleast one document', 'Warning')
            return
        }
        var ext = this.fileext;
        // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'pdf') {
        // } else {
        //     this.toastr.warning('Please select valid file', 'warning')
        //     return
        // }
        if (this.investor_id == null || this.investor_id == undefined) {
            this.toastr.warning('Please complete form 1 first', 'Warning')
            return
        }
        this.bankDetailStepDone = true;
        this.authService.addBankDetailForm(formdata).subscribe(data => {
            console.log(data)
            if (data.success == 1) {
                this.stepperNextAsyc(stepper, '3')
            } else {
                // this.toastr.error(data.message, 'Error');
            }
        }, err => {
            console.log(err)
            // this.toastr.error(this.authService.COMMON_ERROR);

        })
        return
    }

    public AddressForm(stepper: MatStepper) {
        var formdata: FormData = new FormData();
        formdata.append("id", this.investor_id);
        console.log(this.address_upload_id);
        if (this.HomeAddress.invalid || this.PostalAddress.invalid ) {
            this.toastr.warning('Please add physical address', 'Warning')
            return
        }else{
            formdata.append("HomeAddress", this.HomeAddress.value)
            formdata.append("PostalAddress", this.PostalAddress.value);
        }
        if (this.address_upload_id) {
            formdata.append("image", this.address_upload_id);
        }
        if (this.AddresswebcamImage) {
            formdata.append("webcam_image", this.AddresswebcamImage);
        }
        if (this.address_upload_id == "Choose File" && !this.AddresswebcamImage) {
            this.toastr.warning('Please upload atleast one document', 'Warning')
            return
        }
        if (this.investor_id == null || this.investor_id == undefined) {
            this.toastr.warning('Please complete form 1 first', 'Warning')
            return
        }
        this.addressStepDone = true;
        this.authService.addAddressForm(formdata).subscribe(data => {
            console.log(data)
            if (data.success == 1) {
                this.stepperNextAsyc(stepper, '4')
            } else {
                // this.toastr.error(data.message, 'Error');
            }
        }, err => {
            console.log(err)
            // this.toastr.error(this.authService.COMMON_ERROR);

        })
        return
    }

    test() {
        Tesseract.recognize('https://production.promaticstechnologies.com/fivetwo/assets/img/investorId/kxd3ymjo1576909083924fvk95s0c.jpg').then(function (result) {
            console.log("====result", result)
            console.log("====test", result.text)

            // alert(result.text);
        });
    }

    serviceIdUpload(evt: any) {
        console.log(evt)
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
        // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
        if (true) { // client want to add any type of file
            // code...
            this.upload_id.push(file);
            // console.log(this.upload_id)
            // this.upload_id.push(evt.target.files[0]);
            // this.validateImage(evt.target.files[0])
            // return

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

    bankUpload(evt: any) {
        console.log(evt)
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
        if (true) { // client want to add any type of image
            // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
            this.bank_upload_id = evt.target.files[0];
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

    addressUpload(evt: any) {
        console.log(evt)
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
        // if (ext == 'jpeg' || ext == 'jpg' || ext == 'png') {
        if (true) { // client want to add any type of file
            this.address_upload_id = evt.target.files[0];
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

    validateImage(image) {
        if (this.investor_id == null || this.investor_id == undefined) {
            this.toastr.warning('Please complete form 1 first', 'Warning')
            return
        } else {
            var formdata: FormData = new FormData();
            formdata.append("image", image);
            formdata.append("investor_id", this.investor_id);

            this.authService.ValidateInvestorImage(formdata).subscribe(data => {
                console.log(data)
                // alert(data)
                if (data.valid) {
                    // this.investor_id = data.data.id;
                } else {
                    this.toastr.error("Invalid Image", 'Error');
                }
            }, err => {
                console.log(err)
                // this.toastr.error(this.authService.COMMON_ERROR);

            })
        }
    }

    checkFirstFormValidity() {

        var status = true;
        if (this.LastName.invalid || this.FirstName.invalid || this.IdNumber.invalid || this.CellNumber.invalid || this.Email.invalid || this.HomeNumber.invalid || this.WorkNumber.invalid || this.TaxNumber.invalid || this.Note.invalid) {

            return status = false;


        } else if (this.LastName2.value != '') {
            // status=false;
            if (this.FirstName2.invalid || this.IdNumber2.invalid || this.CellNumber2.invalid || this.Email2.invalid || this.HomeNumber2.invalid || this.WorkNumber2.invalid ||  this.TaxNumber2.invalid) {
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

    keyFunc(event, ind) {
        console.log("index=", ind, "child", this.childrens)
        // this.childrens.forEach((element, index) => {
        //     if (element.FullName && element.IdNumber && element.Email && element.CellNumber && element.relation) {
        //         console.log("-----", index == ind)
        //         if (index == ind) {
        //             if (!this.beneficiaries[index].FullName && !this.beneficiaries[index].Relationship && !this.beneficiaries[index].CellNumber) {
        //                 this.beneficiaries[index].FullName = element.FullName
        //                 this.beneficiaries[index].Relationship = element.relation
        //                 this.beneficiaries[index].CellNumber = element.CellNumber
        //                 return
        //             }
        //             else {
        //                 this.beneficiaries[index + 1].FullName = element.FullName
        //                 this.beneficiaries[index + 1].Relationship = element.relation
        //                 this.beneficiaries[index + 1].CellNumber = element.CellNumber
        //                 return
        //             }
        //         } else {
        //             if (!this.beneficiaries[ind].FullName && !this.beneficiaries[ind].Relationship && !this.beneficiaries[ind].CellNumber) {
        //                 this.beneficiaries[ind].FullName = element.FullName
        //                 this.beneficiaries[ind].Relationship = element.relation
        //                 this.beneficiaries[ind].CellNumber = element.CellNumber
        //                 return
        //             }
        //         }
        //     }
        // });
    }

    AddSpouse() {
        var ind
        if (this.FirstName2.value || this.LastName2.value) {
            for (let index = 0; index < this.childrens.length; index++) {
                const element = this.childrens[index];
                if (!element.FullName && !element.relation && !element.CellNumber || element.relation == 'spouse') {
                    ind = index
                    break;
                }
            }
            this.childrens[ind].FullName = this.FirstName2.value + " " + this.LastName2.value
            this.childrens[ind].relation = 'spouse'
            this.childrens[ind].CellNumber = this.CellNumber2.value
        }
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

    checkEmail(value) {
        if (value != null) {
            this.childError = true;
            return true
        } else {
            this.childError = false
            return false
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

    clearSign() {
        // console.log(evt)
        this.DisclosureSign = "";

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


    public fifthForm(status) {
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
        formdata.append("status", status);

        // if (this.Year1 == 0 || this.Year2 == 0 || this.Year3 == 0 || this.Year4 == 0 || this.Year5 == 0 || this.Year6 == 0) {
        //     this.toastr.warning('Year % should be greater than 0')
        //     return
        // }

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

        if (!this.bankDetailStepDone) {
            this.toastr.warning('Please complete step 3 first', 'Warning')
            return
        }

        if (!this.addressStepDone) {
            this.toastr.warning('Please complete step 4 first', 'Warning')
            return
        }

        if (!this.isThirdStepDone) {
            this.toastr.warning('Please complete step 5 first', 'Warning')
            return
        }
        if (!this.isForthStepDone) {
            this.toastr.warning('Please complete step 6 first', 'Warning')
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
            // this.Year1 = 0;
        }
        if (isNaN(this.Year2)) {
            //  this.Year2 = 0;
        }
        if (isNaN(this.Year3)) {
            // this.Year3 = 0;
        }
        if (isNaN(this.Year4)) {
            // this.Year4 = 0;
        }
        if (isNaN(this.Year5)) {
            // this.Year5 = 0;
        }
        if (isNaN(this.Year6)) {
            //this.Year6 = 0;
        }
        this.YearTotal = Number(this.Year1) + Number(this.Year2) + Number(this.Year3) + Number(this.Year4) + Number(this.Year5) + Number(this.Year6);
        if (isNaN(this.YearTotal)) {
            this.YearTotal = 0;
            console.log(this.YearTotal)
        } else {
            console.log(this.YearTotal)
        }

        if (this.YearTotal == 100) {
            this.errorClass = "";
        } else {
            this.errorClass = "error-percent";
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
                // console.log(newstep, 'status-------' + status)
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
        // console.log('in the update color')
        const component = this

        this.opened.forEach(function (item, index) {
            // console.log('array' + index, item)
            if (item == 1) {
                component.changeIconColor(item, component.isFirstStepDone)
            } else if (item == 2) {
                component.changeIconColor(item, component.isSecondStepDone)
            } else if (item == 3) {
                component.changeIconColor(item, component.bankDetailStepDone)
            } else if (item == 4) {
                component.changeIconColor(item, component.addressStepDone)
            } else if (item == 5) {
                component.changeIconColor(item, component.isThirdStepDone)
            } else if (item == 6) {
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

    anyStepTo(stepper: MatStepper) {
        // stepper
        this.stepper.selectedIndex = 1;
        // this.stepper.next();
        alert("d")

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
            // console.log("Hello");
        }, 250);

    }

    //   Id Validation 
    luhn(value) {
        var length = value.length,
            mul = 0,
            prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
            sum = 0;

        while (length--) {
            sum += prodArr[mul][parseInt(value.charAt(length), 10)];
            mul ^= 1;
        }

        return (sum % 10 === 0 && sum > 0);
    };


    date(year, month, day) {
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return false;
        }
        if (day.length > 2 || month.length > 2 || year.length > 4) {
            return false;
        }

        day = parseInt(day, 10);
        month = parseInt(month, 10);
        year = parseInt(year, 10);

        if (year < 1000 || year > 9999 || month <= 0 || month > 12) {
            return false;
        }
        var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Update the number of days in Feb of leap year
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            numDays[1] = 29;
        }

        // Check the day
        if (day <= 0 || day > numDays[month - 1]) {
            return false;
        }

        // if (notInFuture === true) {
        // 	var currentDate  = new Date(),
        // 		currentYear  = currentDate.getFullYear(),
        // 		currentMonth = currentDate.getMonth(),
        // 		currentDay   = currentDate.getDate();
        // 	return (year < currentYear
        // 	|| (year === currentYear && month - 1 < currentMonth)
        // 	|| (year === currentYear && month - 1 === currentMonth && day < currentDay));
        // }

        return true;
    }


    _za(value) {
        if (!/^[0-9]{10}[0|1][8|9][0-9]$/.test(value)) {
            return false;
        }
        var year = parseInt(value.substr(0, 2), 10),
            currentYear = new Date().getFullYear() % 100,
            month = parseInt(value.substr(2, 2), 10),
            day = parseInt(value.substr(4, 2), 10);
        year = (year >= currentYear) ? (year + 1900) : (year + 2000);

        if (!this.date(year, month, day)) {
            return false;
        }

        // Validate the last check digit
        return this.luhn(value);
    }
}

// functions
function luhn(value) {
    var length = value.length,
        mul = 0,
        prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
        sum = 0;

    while (length--) {
        sum += prodArr[mul][parseInt(value.charAt(length), 10)];
        mul ^= 1;
    }

    return (sum % 10 === 0 && sum > 0);
};


function date(year, month, day) {
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return false;
    }
    if (day.length > 2 || month.length > 2 || year.length > 4) {
        return false;
    }

    day = parseInt(day, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);

    if (year < 1000 || year > 9999 || month <= 0 || month > 12) {
        return false;
    }
    var numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Update the number of days in Feb of leap year
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        numDays[1] = 29;
    }

    // Check the day
    if (day <= 0 || day > numDays[month - 1]) {
        return false;
    }

    // if (notInFuture === true) {
    // 	var currentDate  = new Date(),
    // 		currentYear  = currentDate.getFullYear(),
    // 		currentMonth = currentDate.getMonth(),
    // 		currentDay   = currentDate.getDate();
    // 	return (year < currentYear
    // 	|| (year === currentYear && month - 1 < currentMonth)
    // 	|| (year === currentYear && month - 1 === currentMonth && day < currentDay));
    // }

    return true;
}


function za(value) {
    if (!/^[0-9]{10}[0|1][8|9][0-9]$/.test(value)) {
        return false;
    }
    var year = parseInt(value.substr(0, 2), 10),
        currentYear = new Date().getFullYear() % 100,
        month = parseInt(value.substr(2, 2), 10),
        day = parseInt(value.substr(4, 2), 10);
    year = (year >= currentYear) ? (year + 1900) : (year + 2000);

    if (!date(year, month, day)) {
        return false;
    }

    // Validate the last check digit
    return luhn(value);
}

