import { Component, OnInit } from '@angular/core';
import { AuthService } from '../.././auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-compliance-officer-investments',
  templateUrl: './compliance-officer-investments.component.html',
  styleUrls: ['./compliance-officer-investments.component.scss']
})
export class ComplianceOfficerInvestmentsComponent implements OnInit {
  broker_id
  first_name
  last_name
  broker_number
  company

  investors
  option = "FirstName"
  search = ''
  length
  offset = '0'
  limit = 50
  orderBy = 'created_at'
  tableSort = []
  sortName = 'DESC'
  opened = [];
  investor
  constructor(private route: ActivatedRoute, private router: Router, private service: AuthService) { }

  ngOnInit() {
    this.getInvestors()
  }

  clientProfile(investor) {
    this.investor = investor
    console.log(investor)
    sessionStorage.setItem('investor', JSON.stringify(this.investor))


    var ob = {
      click_investor: 'yes'
    }
    sessionStorage.setItem('click_investor', JSON.stringify(ob))

    this.router.navigate(['/officer/dbBrokerClientProfile'])
  }

  getInvestors() {
    // var broker = JSON.parse(sessionStorage.getItem('broker'))

    // if (broker!=null) {
    // 	// code...
    // 	this.broker_id = broker.id
    // 	this.first_name=broker.first_name
    // 	this.last_name=broker.last_name
    // 	this.broker_number=broker.broker_number
    // 	this.company=broker.company
    // 	console.log(broker)
    // 	console.log(this.broker_id)
    // }

    var ob = {
      offset: this.offset,
      limit: this.limit,
      order_by: this.orderBy,
      sort: this.sortName,
      option: this.option,
      search: this.search,
      // broker_id:this.broker_id
    };

    this.service.investors(ob).subscribe(data => {

      if (data) {
        this.investors = data.data
        this.length = data.count
        console.log(data)
      }
    }, err => {
      console.log(err)
    })
  }

  getSearch() {
    this.getInvestors()
  }

  paginationOptionChange(evt) {
    console.log(evt)
    this.offset = (evt.pageIndex * evt.pageSize).toString()
    this.limit = evt.pageSize

    this.getInvestors()

  }

  toggleSort(key) {

    if (this.tableSort[key]) {
      this.tableSort[key] = false
    } else {
      this.tableSort[key] = true
    }
  }

  getToggleKey(orderName) {
    var key
    if (orderName == 'investor_number') {
      key = 0
    } else if (orderName == 'investor_name') {
      key = 1
    }
    return key
  }

  getToggleSort(orderName) {
    var key = this.getToggleKey(orderName)
    this.toggleSort(key)

    if (this.tableSort[key]) {
      return 'DESC'
    } else {
      return 'ASC'
    }

  }

  // {firstName:"John", lastName:"Doe", age:46}

  sort(order_by) {
    console.log(order_by)
    var sort = this.getToggleSort(order_by)
    console.log(sort)
    this.orderBy = order_by
    this.sortName = sort
    this.getInvestors()


  }

  // form = new FormGroup({

  // });
  toggle(id) {
    const index = this.opened.indexOf(id);
    if (index > -1) {
      this.opened.splice(index, 1);
    } else {
      this.opened.push(id);
    }
  }

}
