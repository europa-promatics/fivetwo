import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from  "@angular/router";
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    COMMON_ERROR = 'Something went wrong, try again later';
    httpOptions = {}
  	constructor(private route:ActivatedRoute,private router:Router,private http:HttpClient,private toastr: ToastrService) {
      console.log(localStorage.getItem('token'))
      this.httpOptions = {
        headers: new HttpHeaders({
              // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type':'application/json',
            'authorization' : localStorage.getItem('token')
        })
    }

  	}

    // error(error: HttpErrorResponse) {
      // let errorMessage;
      // let  obj= {};
      // if (error.error instanceof ErrorEvent) {
        // obj = {
          // message: error.error,
          // status: error.status,
        // }
        // errorMessage = obj;
      // } else {
        // obj = {
          // message: error.error,
          // status: error.status,
        // }
        // errorMessage = obj;

      // }
      // return throwError(obj);
    // }


    SERVER_URL = "https://production.promaticstechnologies.com:3001/";
    // SERVER_URL = "https://13.233.185.124:3001/";
    // SERVER_URL = "http://localhost:3001/";
    
    
    httpOptionswithoutContent = {
        headers: new HttpHeaders({
              // 'Content-Type': 'application/x-www-form-urlencoded',
            'authorization' : localStorage.getItem('token')
        })
    }
    httpOptionsLogin = {
        headers: new HttpHeaders({
              // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type':'application/json',
        })
    }

    showAuthError(error){
      console.log(error, "&&&&&&&&&&&&&&&&&&&&&");
        if(error.error && error.error.token_error){
            //alert("Yes token invalid");
            this.toastr.error(error.error.message);
            // return
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            localStorage.removeItem('token');
      	    this.router.navigate(['/login']);
        }else{
            this.toastr.error("Somthing went wrong here");
            // alert("Somthing went wrong here");
        }
    }

  	async login(formdata,remember) {

        this.http.post<any>(this.SERVER_URL+'login', formdata,this.httpOptionsLogin).subscribe(
        res => {

            console.log(remember);

            if (res.success==1) {
                if (remember) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    localStorage.setItem('token', res.token);
                }else{
                    sessionStorage.setItem('user', JSON.stringify(res.data));
                    localStorage.setItem('token', res.token);
                }
              //  alert(res.token);
              //  alert(localStorage.getItem('token'));
                this.toastr.success(res.message);
                this.router.navigate(['/user/dashboard']);
            }else{
                this.toastr.error(res.message);
                // console.log(res.message);

            }
        },err=>{
            this.toastr.error('Something went wrong, try again later');
            // console.log(err.message)
        })
    }
    
    loginNew(formdata,remember): Observable<any> {
      
      let API_URL = this.SERVER_URL+'login';
      return this.http.post(API_URL,formdata,{
        headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type':'application/json',
        })
      })
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

  	async logout(){
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        localStorage.removeItem('token');
  	    this.toastr.success('You logout successfully');
  	    this.router.navigate(['/login']);
  	}

    async officerLogin(formdata,remember) {

        this.http.post<any>(this.SERVER_URL+'officer-login', formdata,this.httpOptions).subscribe(
        res => {

            console.log(remember);

            if (res.success==1) {
                if (remember) {
                    localStorage.setItem('officer', JSON.stringify(res.data));
                }else{
                    sessionStorage.setItem('officer', JSON.stringify(res.data));
                }

                this.toastr.success(res.message);
                this.router.navigate(['/officer/brokersList']);
            }else{
                this.toastr.error(res.message);
                // console.log(res.message);

            }
        },err=>{
            this.toastr.error('Something went wrong, try again later');
            // console.log(err.message)
        })
    }

    async officerLogout(){
        localStorage.removeItem('officer');
        sessionStorage.removeItem('officer');
        this.toastr.success('You logout successfully');
        this.router.navigate(['/officerLogin']);
    }

  	get isLoggedIn(): boolean {
      	const  user  =  JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

        // if (user==null) {
        //     const  user  =  JSON.parse(sessionStorage.getItem('user'));
        // }
      	return  user  !==  null;
  	}

    get isOfficerLoggedIn(): boolean {
        const  officer  =  JSON.parse(localStorage.getItem('officer')) || JSON.parse(sessionStorage.getItem('officer'));


        return  officer  !==  null;
    }


    addInvestor(data): Observable<any> {
      let API_URL = this.SERVER_URL+'add-investor';
      return this.http.post(API_URL,data,this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    clientProfile(data): Observable<any> {
      let API_URL = this.SERVER_URL+'get-client-profile';
      return this.http.post(API_URL,data,this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
      )
    }
    clientProfileData(data): Observable<any> {
      let API_URL = this.SERVER_URL+'get-client-data';
      return this.http.post(API_URL,data,this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
      )
    }

    updateInvestor(data): Observable<any> {
      let API_URL = this.SERVER_URL+'update-investor';
      return this.http.post(API_URL,data,this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    addInvestorSecondForm(data): Observable<any> {
      let API_URL = this.SERVER_URL+'add-investor-second-form';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        })
        // retry(1),
        // catchError(this.error)
        )
    }

    ValidateInvestorImage(data): Observable<any> {
      let API_URL = this.SERVER_URL+'validate/image';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        })
        // retry(1),
        // catchError(this.error)
        )
    }

    addInvestorThirdForm(data): Observable<any> {
      let API_URL = this.SERVER_URL+'add-investor-third-form';
      return this.http.post(API_URL,data,this.httpOptionswithoutContent)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    addInvestorForthForm(data): Observable<any> {
      let API_URL = this.SERVER_URL+'add-investor-forth-form';
      return this.http.post(API_URL,data,this.httpOptionswithoutContent)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    addInvestorFifthForm(data): Observable<any> {
      let API_URL = this.SERVER_URL+'add-investor-fifth-form';
      return this.http.post(API_URL,data,this.httpOptionswithoutContent)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    investors(data): Observable<any> {
      let API_URL = this.SERVER_URL+'investor';
      return this.http.post(API_URL,data,this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    leads(data): Observable<any> {
      let API_URL = this.SERVER_URL+'lead';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    addLead(data): Observable<any> {
      let API_URL = this.SERVER_URL+'add-lead';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    leadStatus(data): Observable<any> {
      let API_URL = this.SERVER_URL+'lead-status';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    brokers(data): Observable<any> {
      let API_URL = this.SERVER_URL+'broker';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    addBrokerAppointment(data): Observable<any> {
      let API_URL = this.SERVER_URL+'broker-appointment';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    companies(): Observable<any> {
      let API_URL = this.SERVER_URL+'companies';
      return this.http.get(API_URL)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    
    getDashboardBalance(): Observable<any> {
      
      let API_URL = this.SERVER_URL+'dashboard-content';
      return this.http.post(API_URL,{},{
        headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type':'application/json',
        'authorization' : localStorage.getItem('token')
        })
      })
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    getComparison(): Observable<any> {
      // alert(localStorage.getItem('token'))
      console.log(this.httpOptions)
      let API_URL = this.SERVER_URL+'dashbaord-comparison';
      return this.http.post(API_URL,{},this.httpOptions)      
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    getYearlyInvestor() : Observable<any> {
      let API_URL = this.SERVER_URL+'client/reviews/years';
      return this.http.post(API_URL,{},this.httpOptions)
      .pipe(map((res:Response) => {
        return res;
      }))
    }
    saveNotes(data) : Observable<any> {
      let API_URL = this.SERVER_URL+'save/notes';
      return this.http.post(API_URL,data,this.httpOptions)
      .pipe(map((res:Response) => {
        return res;
      }))
    }
    getMonthlyInvestor(obj) : Observable<any> {
      let API_URL = this.SERVER_URL+'client/reviews/monthly';
      return this.http.post(API_URL,obj,this.httpOptions)
      .pipe(map((res:Response) => {
        return res;
      }))
    }

    getReviewsClient(obj) : Observable<any> {
      let API_URL = this.SERVER_URL+'get/review/clients';
      return this.http.post(API_URL,obj,this.httpOptions)
      .pipe(map((res:Response) => {
        return res;
      }))
    }
    moveClient(obj) : Observable<any> {
      let API_URL = this.SERVER_URL+'move/investors';
      return this.http.post(API_URL,obj,this.httpOptions)
      .pipe(map((res:Response) => {
        return res;
      }))
    }

    getProducts(): Observable<any> {
      
      let API_URL = this.SERVER_URL+'dashbaord-products';
      return this.http.post(API_URL,{},this.httpOptions)      
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    getHomeBanner(): Observable<any> {
      let API_URL = this.SERVER_URL+'getHomeBanners';
      return this.http.get(API_URL)      
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    getPrivacyPolicy(): Observable<any> {
      let API_URL = this.SERVER_URL+'privacy_policy';
      return this.http.get(API_URL)      
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    getTerms(): Observable<any> {
      let API_URL = this.SERVER_URL+'termsAndCondition';
      return this.http.get(API_URL)      
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    getAboutUs(): Observable<any> {
      let API_URL = this.SERVER_URL+'getAboutUs';
      return this.http.get(API_URL)      
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }
    getHowItWorks(): Observable<any> {
      let API_URL = this.SERVER_URL+'getHowItWorks';
      return this.http.get(API_URL)      
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    getClients(): Observable<any> {
      
      let API_URL = this.SERVER_URL+'dashbaord-clients';
      return this.http.post(API_URL,{},this.httpOptions)      
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    filterHolding(form): Observable<any> {
      let API_URL = this.SERVER_URL+'filter-holding';
      return this.http.post(API_URL,form,this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    bankList(): Observable<any> {
        let API_URL = this.SERVER_URL+'bank-list';
        return this.http.get(API_URL)
        .pipe(
          map((res: Response) => {
            return res
          }),
          // retry(1),
          // catchError(this.error)
          )
      }


    broker_codes(data): Observable<any> {
      let API_URL = this.SERVER_URL+'broker-codes';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    singleInvestor(data): Observable<any> {
      let API_URL = this.SERVER_URL+'single-investor';
      return this.http.post(API_URL,data,this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }

    forgotPassword(data): Observable<any> {
      let API_URL = this.SERVER_URL+'forgot-password';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        }),
        retry(1),
        // catchError(this.error)
        )
    }

    // beforSetPassword(data): Observable<any> {
    //   let API_URL = this.SERVER_URL+'before-set-password';
    //   return this.http.post(API_URL,data)
    //   .pipe(
    //     map((res: Response) => {
    //       return res
    //     }),
    //     retry(1),
    //     // catchError(this.error)
    //     )
    // }

    setPassword(data): Observable<any> {
      let API_URL = this.SERVER_URL+'set-password';
      return this.http.post(API_URL,data)
      .pipe(
        map((res: Response) => {
          return res
        }),
        retry(1),
        // catchError(this.error)
        )
    }
    
    getTotalValue(data): Observable<any> {
      let API_URL = this.SERVER_URL+'get/all/total/value/client';
      return this.http.post(API_URL,data,this.httpOptions)
      .pipe(
        map((res: Response) => {
          return res
        }),
        retry(1),
        // catchError(this.error)
        )
    }

    updateDisclosure(data): Observable<any> {
      let API_URL = this.SERVER_URL+'upload/disclosure';
      return this.http.post(API_URL,data,this.httpOptionswithoutContent)
      .pipe(
        map((res: Response) => {
          return res
        }),
        // retry(1),
        // catchError(this.error)
        )
    }


}
