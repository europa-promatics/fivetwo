import { Component, OnInit, NgZone  } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
declare var $;
import { ToastrService } from 'ngx-toastr';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import { AuthService } from '../.././auth/auth.service';
import { pushAll } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	private chart: am4charts.XYChart;
	total_value=0
	temp = []
	reviews_list = []
	last_updated;
	holding = []
	dateFrom
	dateTo
	total_products = [];
	total_clients = [];
	total_review_amount = 0

	//   constructor( private zone: NgZone ) { }
	constructor(private zone: NgZone, private authService: AuthService, private toastr: ToastrService) { }

  	ngOnInit() {
		  $('[data-toggle="tooltip"]').tooltip(); 
		  this.getInvestorTotalBalance();
		  this.getComparison();
		  this.getClients();
		  this.getProducts();
  		// this.getName();
  	}

	showProductsAUM(){
		this.zone.runOutsideAngular(() => {
			let chart = am4core.create("chartdiv_compare", am4charts.XYChart);
  
			chart.colors.step = 2;
  
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.maxWidth = 120
  
			var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = 'category'
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.9
			xAxis.renderer.grid.template.location = 0;
  
			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			
			  
			var label = xAxis.renderer.labels.template;
			label.wrap = true;
			label.maxWidth = 120;
			chart.colors.list = [
			  am4core.color("#238ab4"),
			  am4core.color("#7e7f7e"),
			];
  
			function createSeries(value, name) {
				var series = chart.series.push(new am4charts.ColumnSeries())
				series.dataFields.valueY = value
				series.dataFields.categoryX = 'category'
				series.name = name
			  //   series.tooltipText = "{categoryX}: {valueY}";
				
  
				series.events.on("hidden", arrangeColumns);
				series.events.on("shown", arrangeColumns);
  
				var bullet = series.bullets.push(new am4charts.LabelBullet())
				bullet.interactionsEnabled = false
				bullet.dy = -10;
				bullet.label.text = '{valueY}'
				bullet.label.fill = am4core.color('#238ab4')
  
				return series;
			}
  
			chart.data = this.total_products;
  
  
			createSeries('first', ' AUM');
		  //   createSeries('second', ' Total Clients');
  
			function arrangeColumns() {
  
				var series = chart.series.getIndex(0);
  
				var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
				if (series.dataItems.length > 1) 
				{
					
					var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
					var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
					var delta = ((x1 - x0) / chart.series.length) * w;
					if (am4core.isNumber(delta)) {
						var middle = chart.series.length / 2;
  
						var newIndex = 0;
						chart.series.each(function(series) {
							if (!series.isHidden && !series.isHiding) {
								series.dummyData = newIndex;
								newIndex++;
							}
							else {
								series.dummyData = chart.series.indexOf(series);
							}
						})
						
						var visibleCount = newIndex;
						var newMiddle = visibleCount / 2;
  
						chart.series.each(function(series) {
							var trueIndex = chart.series.indexOf(series);
							var newIndex = series.dummyData;
  
							var dx = (newIndex - trueIndex + middle - newMiddle) * delta
  
							series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
							series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
						})
					}
				}
			}
			
  
			this.chart = chart;
			// line chart ends
		  });
	}
	showProductsClient(){
		this.zone.runOutsideAngular(() => {
			let chart = am4core.create("chartdiv_compare_products", am4charts.XYChart);
  
			chart.colors.step = 2;
  
			chart.legend = new am4charts.Legend()
			chart.legend.position = 'top'
			chart.legend.paddingBottom = 20
			chart.legend.labels.template.maxWidth = 120
  
			var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
			xAxis.dataFields.category = 'category'
			xAxis.renderer.cellStartLocation = 0.1
			xAxis.renderer.cellEndLocation = 0.9
			xAxis.renderer.grid.template.location = 0;
  
			var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
			yAxis.min = 0;
			
			  
			var label = xAxis.renderer.labels.template;
			label.wrap = true;
			label.maxWidth = 120;
			chart.colors.list = [
			  
			  am4core.color("#7e7f7e"),
			  am4core.color("#238ab4"),
			];
  
			function createSeries(value, name) {
				var series = chart.series.push(new am4charts.ColumnSeries())
				series.dataFields.valueY = value
				series.dataFields.categoryX = 'category'
				series.name = name
			  //   series.tooltipText = "{categoryX}: {valueY}";
				
  
				series.events.on("hidden", arrangeColumns);
				series.events.on("shown", arrangeColumns);
  
				var bullet = series.bullets.push(new am4charts.LabelBullet())
				bullet.interactionsEnabled = false
				bullet.dy = -10;
				bullet.label.text = '{valueY}'
				bullet.label.fill = am4core.color('#6d6d6d')
  
				return series;
			}
  
			chart.data = this.total_clients;
  
  
			// createSeries('first', ' AUM');
		    createSeries('second', ' Total Clients');
  
			function arrangeColumns() {
  
				var series = chart.series.getIndex(0);
  
				var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
				if (series.dataItems.length > 1) 
				{
					
					var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
					var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
					var delta = ((x1 - x0) / chart.series.length) * w;
					if (am4core.isNumber(delta)) {
						var middle = chart.series.length / 2;
  
						var newIndex = 0;
						chart.series.each(function(series) {
							if (!series.isHidden && !series.isHiding) {
								series.dummyData = newIndex;
								newIndex++;
							}
							else {
								series.dummyData = chart.series.indexOf(series);
							}
						})
						
						var visibleCount = newIndex;
						var newMiddle = visibleCount / 2;
  
						chart.series.each(function(series) {
							var trueIndex = chart.series.indexOf(series);
							var newIndex = series.dummyData;
  
							var dx = (newIndex - trueIndex + middle - newMiddle) * delta
  
							series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
							series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
						})
					}
				}
			}
			
  
			this.chart = chart;
			// line chart ends
		  });
	}

	showMap() {
		this.zone.runOutsideAngular(() => {
		  let chart = am4core.create("chartdiv_value", am4charts.XYChart);

		  chart.data = this.reviews_list.map(function (obb) {
			  return {
				"year": obb.product_name,
				"income": obb.totalAmount
			  };
		  })
		  console.log(chart.data);
		  //   [{
		  //     "year": "2005",
		  //     "income": 5,
		  // }, {
		  //     "year": "2006",
		  //     "income": 26,
		  // }, {
		  //     "year": "2007",
		  //     "income": 15,
		  // }, {
		  //     "year": "2008",
		  //     "income": 34,
		  // }, {
		  //     "year": "2009",
		  //     "income": 39,
		  // }, {
		  //     "year": "2010",
		  //     "income": 42,
		  // }];

		  //create category axis for years
		  var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
		  categoryAxis.dataFields.category = "year";
		  categoryAxis.renderer.inversed = true;
		  categoryAxis.renderer.labels.template.disabled = true;
		  categoryAxis.renderer.grid.template.location = 0;

		  //create value axis for income and expenses
		  var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
		  // valueAxis.renderer.opposite = true;

		  var cellSize = 45;
		  chart.events.on("datavalidated", function(ev) {

			// Get objects of interest
			var chart = ev.target;
			var categoryAxis = chart.yAxes.getIndex(0);
			// Calculate how we need to adjust chart height
			var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
			// get current chart height
			var targetHeight = chart.pixelHeight + adjustHeight;
			// Set it on chart's container
			chart.svgContainer.htmlElement.style.height = targetHeight + "px";
		  });

		  //create columns
		  var series = chart.series.push(new am4charts.ColumnSeries());
		  series.dataFields.categoryY = "year";
		  series.dataFields.valueX = "income";
		  series.name = "Value (M)";
		  series.columns.template.fillOpacity = 0.5;
		  series.columns.template.strokeOpacity = 0;
		  series.columns.template.width = am4core.percent(10);
		  // series.tooltipText = "Value {categoryY}: {valueX.value}M";

		  //add chart cursor
		  chart.cursor = new am4charts.XYCursor();
		  chart.cursor.behavior = "zoomY";

		  //add legend
		  chart.legend = new am4charts.Legend();
		  chart.legend.position = 'top'
		  chart.legend.paddingBottom = 10
		  chart.legend.labels.template.maxWidth = 120

		  this.chart = chart;
		  // line chart ends
		});
	}
	
	showCoparisonChart(){
		this.zone.runOutsideAngular(() => {
			let chart = am4core.create("chartdiv_fst", am4charts.XYChart);
  
			var data = [];
			chart.data = this.holding;
  
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.ticks.template.disabled = true;
			categoryAxis.renderer.line.opacity = 1;
			categoryAxis.renderer.grid.template.disabled = true;
			categoryAxis.renderer.minGridDistance = 0;
			categoryAxis.dataFields.category = "year";
			categoryAxis.startLocation = 0.4;
			categoryAxis.endLocation = 0.6;
  
  
			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.tooltip.disabled = true;
			valueAxis.renderer.line.opacity = 1;
			valueAxis.renderer.ticks.template.disabled = true;
			valueAxis.min = 0;
  
			var lineSeries = chart.series.push(new am4charts.LineSeries());
			lineSeries.dataFields.categoryX = "year";
			lineSeries.dataFields.valueY = "income";
			lineSeries.tooltipText = "AUM: {valueY.value}";
			lineSeries.fillOpacity = 0.5;
			lineSeries.strokeWidth = 3;
			lineSeries.propertyFields.stroke = "lineColor";
			lineSeries.propertyFields.fill = "lineColor";
  
			var bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
			bullet.circle.radius = 6;
			bullet.circle.fill = am4core.color("#fff");
			bullet.circle.strokeWidth = 3;
  
			chart.cursor = new am4charts.XYCursor();
			chart.cursor.behavior = "panX";
			chart.cursor.lineX.opacity = 0;
			chart.cursor.lineY.opacity = 0;
  
			this.chart = chart;
			// line chart ends
		  });
	}

	//   Get total balance 
	getInvestorTotalBalance(){
		
	  this.authService.getDashboardBalance().subscribe(data => {
		
		if (data) {
		  console.log(data)
		  this.total_value = data.total_balance;
		  this.reviews_list = data.reviews;
		  this.last_updated = data.last_updated;
		//   this.holding = data.groupByDayWeeklyFinal;
		  //this.total_products = data.total_products;
		}
		this.showMap();
		this.showProductsAUM();
		this.showProductsClient();
		var seen = {};
		//alert($('#aTable td').length)
		
		
		// setInterval(function(){ 

		// $('#aTable td').each(function()
		// 	{
		// 		var $this = $(this);
		// 		var index = $this.index();
		// 		var txt =  $this.text();
		// 		console.log(txt,'')
		// 		if (seen[index] === txt)
		// 		{
		// 			$($this.parent().prev().children()[index]).attr('rowspan', 2);
		// 			$this.hide();
		// 		}
		// 		else
		// 		{
		// 			seen[index] = txt;
		// 		}
		// 	});
		// }, 3000);


		// iterate and adding ammount
		this.reviews_list.forEach((val,ind) => {
			
			this.total_review_amount = this.total_review_amount + val.totalAmount;
			// console.log(this.total_review_amount);
		})
	  }, err => {
		console.log(err)
		// If not token provided or token invalid
		this.authService.showAuthError(err);
		//this.toastr.error(err.message);
		// this.toastr.error(this.authService.COMMON_ERROR);
	  })  
		
	}

	getComparison(){
		
	  this.authService.getComparison().subscribe(data => {
		
		if (data) {
		  console.log(data)
		  this.holding = data.array
		  this.showCoparisonChart();
		}
		// this.showMap();

		
	  }, err => {
		console.log(err)
		// If not token provided or token invalid
		this.authService.showAuthError(err);
		//this.toastr.error(err.message);
		// this.toastr.error(this.authService.COMMON_ERROR);
	  })  
		
	}

	getProducts(){
		
		this.authService.getProducts().subscribe(data => {
		  
		  if (data) {
			console.log(data)
			this.total_products = data.products
			this.showProductsAUM();
		  }
		  // this.showMap();
  
		  
		}, err => {
		  console.log(err)
		  // If not token provided or token invalid
		  this.authService.showAuthError(err);
		  //this.toastr.error(err.message);
		  // this.toastr.error(this.authService.COMMON_ERROR);
		})  
		  
	  }
	getClients(){
		
		this.authService.getClients().subscribe(data => {
		  
		  if (data) {
			console.log(data)
			this.total_clients = data.total_products_client
			this.showProductsClient();
		  }
		  // this.showMap();
  
		  
		}, err => {
		  console.log(err)
		  // If not token provided or token invalid
		  this.authService.showAuthError(err);
		  //this.toastr.error(err.message);
		  // this.toastr.error(this.authService.COMMON_ERROR);
		})  
		  
	  }

	getYearFromString(item,index){
		//var y = item.year_wise_data && item.year_wise_data != "zz" ? "Year "+item.year_wise_data.replace ( /[^\d.]/g, '' ) : "--"
		if(item.year_wise_data && item.year_wise_data == "repeat"){
			return "";
		}else if(item.year_wise_data && item.year_wise_data != "zz"){
			return "Year "+item.year_wise_data.replace ( /[^\d.]/g, '' );
		}else{
			return "--"
		}
		// return item.year_wise_data && item.year_wise_data != "zz" ? "Year "+item.year_wise_data.replace ( /[^\d.]/g, '' ) : "--"
	}

	ngOnDestroy() {
	  	this.zone.runOutsideAngular(() => {
		    if (this.chart) {
		      this.chart.dispose();
		    }
	  	});
	}
	form = new FormGroup({
    	// email: new FormControl('', Validators.required),
    	// password: new FormControl('', Validators.required),
  	});


  	get firstName(){
  		const  user  =  JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
  		return user.first_name;
  		// console.log(user.first_name);
	  }
	  
	  addEventTo(type: string, event: MatDatepickerInputEvent<Date>) {
		console.log(event.value);
		this.dateTo = event.value;
		console.log(`${type}: ${event.value}`);
	  }

	  addEventFrom(type: string, event: MatDatepickerInputEvent<Date>) {
		console.log(event.value);
		this.dateFrom = event.value;
		console.log(`${type}: ${event.value}`);
	  }

	  filter(){
		  if(this.dateFrom && this.dateTo){
			var obj = {
				date_from : this.dateFrom,
				date_to : this.dateTo,
			};
			this.authService.filterHolding(obj).subscribe(data => {
	
				if (data.success == 1) {
					console.log(data)
					this.holding = data.values;
					this.showMap()					
				}else{
					this.toastr.error(data.message,'Error')
				}
			}, err => {
				console.log(err)
				// If not token provided or token invalid
				this.authService.showAuthError(err);
				//this.toastr.error(err.message);
				// this.toastr.error(this.authService.COMMON_ERROR);
			})  
		   }
	  }

	  getPercentage(item){
		if(item.totalAmount > 0){
			return Math.round(item.totalAmount / this.total_review_amount * 100)
		}else{
			return 0;
		}
	  }

}
