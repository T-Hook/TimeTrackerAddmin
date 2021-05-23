import { Component, OnInit } from '@angular/core';
import { TrackingService } from 'app/services/tracking.service';
import * as Chart from 'chart.js';
import { ProjectService } from '../../../services/project.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public chartColor;
  public chartEmail;
  public chartHours;
  canvas: any; ctx: any;
  canvas2: any; ctx2: any; canvas3: any; ctx3: any;
// This will hold our chart info
  chart = [];
  charts = [];
  constructor(private trackingservice: TrackingService, private projectservice: ProjectService) {
  }
public removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};
  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}
    ngOnInit() {
      this.chartColor = '#FFFFFF';
      this.trackingservice.getAll().subscribe(
        result => {
          const hours = result.map(result => result.hours);
          const users = result.map(result => result.idUser.email);
          console.log(hours);
          console.log(users);
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: users,
                label: users,
                datasets: [{
                  axis: 'y',
                  label: ' number of hours',
                    data: hours,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
              responsive: true,
              scales: {
                yAxes: [
                  {

                    ticks: {
                      beginAtZero: true,
                      min : 0,
                      max : 8,
                      stepSize : 1
                    },
                    scaleLabel: {
                      display : true,
                      labelString : 'Tracking hours'
                    }
                  }
                ],
                xAxes: [
                  {
                    barPercentage : 0.3,
                    scaleLabel: {
                      display : true,
                      labelString : 'Users identity'
                    }
                  }
                ]
              }
            }
        });
        }
      );
      this.projectservice.get().subscribe(
        res => {
          //for state finished /new / in progress //
          const arr = res.filter(res => res.status === 'New');
          const arr2 = res.filter(res => res.status === 'In progress');
          const arr3 = res.filter(res => res.status === 'Finished');
          var u = this.removeDuplicates(arr, "status");
          var u2 = this.removeDuplicates(arr2, "status");
          var u3 = this.removeDuplicates(arr3, "status");
          var result = u.concat(u2).concat(u3);
          var state = result.map(res => res.status);
          console.log(state);
          // for number of project for different state //
          const l = Object.keys(arr).length;
          const l2 = Object.keys(arr2).length;
          const l3= Object.keys(arr3).length;
         // convert number to array //
          let array = Array.from(String(l), Number);
          let array2 = Array.from(String(l2), Number);
          let array3 = Array.from(String(l3), Number);
          var result2 = array.concat(array2).concat(array3);
          console.log(result2);
          this.charts = new Chart('canvas2', {
            type: 'pie',
            data: {
              labels: state,
              datasets: [{
                  label: 'Project Status',
                  data: result2,
                  backgroundColor: ['Blue', 'Red', 'Yellow'],
                  borderWidth: 1
              }]
          },
          options: {
        legend: {
            display: true
        },
            responsive: true,
            display: true,
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
          }
        });
        }
      );
      this.canvas3 = document.getElementById('myChart3');
      this.ctx3 = this.canvas3.getContext('2d');
          const myChart3 = new Chart(this.ctx3, {
            type: 'pie',
            data: {
                labels: ['Angular 10', 'Angular 9', 'Angular 8'],
                datasets: [{
                    label: 'Active Angular Vesrions',
                    data: [85, 100, 60],
                    backgroundColor: ['pink', 'gray', 'green'],
                    borderWidth: 1
                }]
            },
            options: {
          legend: {
              display: true
          },
              responsive: true,
              display: true,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
            }
          });
      }
      }
