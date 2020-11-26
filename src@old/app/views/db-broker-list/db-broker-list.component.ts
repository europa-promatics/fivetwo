import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from  "@angular/router";

@Component({
  selector: 'app-db-broker-list',
  templateUrl: './db-broker-list.component.html',
  styleUrls: ['./db-broker-list.component.scss']
})
export class DbBrokerListComponent implements OnInit {
	tableSort=[true,true,true]
	length
	brokers
	offset='0'
	limit=50
  	orderBy='created_at'
  	sortName='DESC'
	opened =[]
	search
	option='first_name'
	broker_id
	first_name
	last_name
	broker_number
	company
	broker
  	

  constructor(private service:AuthService,private router:Router) { }

  ngOnInit() {

  	this.getBrokers()
  }

  brokerDetails(id,first_name,last_name,broker_number,company){
  	console.log('brokerDetails in')
  	this.broker_id=id
  	this.first_name=first_name
  	this.last_name=last_name
  	this.broker_number=broker_number
  	this.company=company

  	// console.log(this.broker_id)
  	this.broker = {
  		id:this.broker_id,
  		first_name:this.first_name,
		last_name:this.last_name,
		broker_number:this.broker_number,
		company:this.company,
  	}

  	sessionStorage.setItem('broker',JSON.stringify(this.broker))

  	

  	// console.log(broker_id)

  	this.router.navigate(['/officer/brokerDetails'])
  	
  }

	getSearch(){
		console.log('service')
		console.log('option:-',this.option)
		console.log('search:-',this.search)

		this.getBrokers()
	}

  sort(order_by){
      console.log(order_by)
      var sort = this.getToggleSort(order_by)
      console.log(sort)
      this.orderBy=order_by
      this.sortName=sort

      this.getBrokers()
     
    }


  paginationOptionChange(evt) {
        console.log(evt)
        this.offset = (evt.pageIndex * evt.pageSize).toString()
        this.limit = evt.pageSize

        this.getBrokers()
        
    }

  getBrokers(){
	  	var ob = {
	      offset:this.offset,
	      limit: this.limit,
	      order_by:this.orderBy,
	      sort:this.sortName,
	      option:this.option,
	      search:this.search
	    };

	  	this.service.brokers(ob).subscribe(data => {
	  	    
	  	    if (data) {
	  	        this.brokers = data.data
	  	        this.length = data.count
	  	        // console.log(data.data.count)
	  	    }
	  	}, err => {
	  	        console.log(err)
	  	        // this.toastr.error(this.authService.COMMON_ERROR);
	  	})
  }

  toggleSort(key){
      
      if (this.tableSort[key]) {
        this.tableSort[key]=false
      }else{
        this.tableSort[key]=true
      }
  }

  getToggleKey(orderName){
    var key
    if (orderName=='broker_number') {
      key=0
    }else if(orderName=='first_name'){
      key=1
    }else if(orderName=='company'){
      key=2
    }
    return key
  }

  getToggleSort(orderName){
    var key = this.getToggleKey(orderName)
    this.toggleSort(key)

    if (this.tableSort[key]) {
      return 'DESC'
    }else{
      return 'ASC'
    }

  }

  toggle(id) {
	    const index = this.opened.indexOf(id);
	    if (index > -1) {
	        	this.opened.splice(index, 1);
	    } else {
	        	this.opened.push(id);
	    }
	}

}
