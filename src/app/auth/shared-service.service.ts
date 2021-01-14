import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class SharedServiceService {    
    user
    constructor(
        public backendApiService: AuthService,
    ) { }

    private subject = new Subject<any>();

    sidebarCount() {
        this.user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));       
        // console.log('user_id===========7==============', obj);
        // this.backendApiService.getProductoCartNotification(obj).subscribe(
        //     (data) => {
        //         console.log(data);
        //         if (data.code === 200) {
        //             var count =0;
        //             var not=0;
        //             data.cart.forEach((val,ind,arr)=>{
        //                 count=count+parseInt(val.item_quantity)
        //             })
        //             var obj={
        //                 cartCount: count,
        //                 notCount: data.noti,
        //                 notlist: data.notlist
        //             }

        //             this.subject.next(obj);
        //         }
        //     },
        //     (err) => {
        //         this.subject.next(0);
        //     }
        // );
        var obj = {
            id: this.user.id,
        }
        this.backendApiService.sideBarCount(obj).subscribe(data => {
            console.log("==data", data)
            if (data.success == 1) {
            //   this.task_count = data.task_count
            //   this.lead_count = data.lead_count
              this.subject.next(data);
      
            } else {
              //this.toastr.error(data.message, 'Error');
            }
          }, err => {
            console.log(err)
            // this.toastr.error(this.authService.COMMON_ERROR);
      
          })
    }
    sidebarService(): Observable<any> {
        return this.subject.asObservable();
    }
}
