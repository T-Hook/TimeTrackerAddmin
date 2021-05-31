import { Component, VERSION, OnInit } from '@angular/core';
import { TrackingService } from 'app/services/tracking.service';
import { UsersService } from 'app/services/users.service';
import * as Chart from 'chart.js';
import { ProjectService } from '../../../services/project.service';
import * as Highcharts from 'highcharts';


declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public numberu: number;
  public numberp: number;
  public numbert: number;
  public chartColor;
  public chartEmail;
  public chartHours;
  defaultOptions: any;
  canvas: any; ctx: any;
  c:any;
  canvas2: any; ctx2: any; canvas3: any; ctx3: any; container: any;
// This will hold our chart info
  chart = [];
  charts = [];
  charts1 = [];
  array = [];
  Highcharts =[];


  constructor(private trackingservice: TrackingService, private projectservice: ProjectService, private usersservice: UsersService) {
  }
    ngOnInit() {
      this.chartColor = '#FFFFFF';

      this.trackingservice.getstat().subscribe(
        res => {
          const hours = res.map(res => res.hours);
          const users = res.map(res => res.idUser.email);
          let result = hours.map(i=>Number(i));
          console.log('hours', result);
          console.log(users);
          this.defaultOptions = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Tracking hour statistics last tracking date'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: users,
                title: {
                    text: null
                }
            },
            yAxis: {
              beginAtZero: true,
              min : 0,
              max : 8,
              tickInterval : 1,
                title: {
                    text: 'Hours',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' Hours'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Tracking hours',
                data: result
            }]}
            Highcharts.chart('c', this.defaultOptions);
          }

          );



      this.projectservice.getstat().subscribe(
        res => {
          const number = Object.keys(res).length;
          this.numberp = number;
          var i;
for(i = 0; i < res.length; i++){
res[i].name = res[i]['status'];
delete res[i].status;
}
console.log('nameeeeeeeeee',res)
          function  findOcc(arr, key) {
            const arr2 = [];
            arr.forEach((x) => {

              // Checking if there is any object in arr2
              // which contains the key value
               if (arr2.some((val) => val[key] === x[key])) {

                 // If yes! then increase the occurrence by 1
                 arr2.forEach((k) => {
                   if (k[key] === x[key]) {
                     k['y']++
                   }
                })

               } else {
                 // If not! Then create a new object initialize
                 // it with the present iteration key's value and
                 // set the occurrence to 1
                 const a = {}
                 a[key] = x[key]
                 a['y'] = 1
                 arr2.push(a);
               }
            })

            return arr2
          }
          const key = 'name'
         this.array = findOcc(res, key);

console.log('trah', this.array);

 this.defaultOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Project status statistics'
        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name} <b>{point.y}</b>'
                },
                showInLegend: true
            }
            , legend: { display: true }
        },
        series: [{
            name: 'Number of projects',
            colorByPoint: true,
            data: this.array
        }]
    }
    Highcharts.chart('canvas2', this.defaultOptions);
  }

  );


      this.usersservice.getspec().subscribe(
        res => {
          const number = Object.keys(res).length;
          this.numberu = number;
          var i;
for(i = 0; i < res.length; i++){
res[i].name = res[i]['speciality'];
delete res[i].speciality;
}
console.log('nameeeeeeeeee',res)
          function  findOcc(arr, key) {
            const arr2 = [];
            arr.forEach((x) => {

              // Checking if there is any object in arr2
              // which contains the key value
               if (arr2.some((val) => val[key] === x[key])) {

                 // If yes! then increase the occurrence by 1
                 arr2.forEach((k) => {
                   if (k[key] === x[key]) {
                     k['y']++
                   }
                })

               } else {
                 // If not! Then create a new object initialize
                 // it with the present iteration key's value and
                 // set the occurrence to 1
                 const a = {}
                 a[key] = x[key]
                 a['y'] = 1
                 arr2.push(a);
               }
            })

            return arr2
          }
          const key = 'name'
         this.array = findOcc(res, key);

      console.log('trah', this.array);

       this.defaultOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Users per speciality'
        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name} <b>{point.y}</b>'
                },
                showInLegend: true
            }
            , legend: { display: true }
        },
        series: [{
            name: 'Number of users',
            colorByPoint: true,
            data: this.array
        }]
    }
    Highcharts.chart('container', this.defaultOptions);
  }

  );
  this.projectservice.gett().subscribe(
    res => {
      const number = Object.keys(res).length;
      this.numbert = number;
     });
        }
      }
