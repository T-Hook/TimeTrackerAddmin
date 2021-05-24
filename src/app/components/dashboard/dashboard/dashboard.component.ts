import { Component, OnInit } from '@angular/core';
import { TrackingService } from 'app/services/tracking.service';
import { UsersService } from 'app/services/users.service';
import * as Chart from 'chart.js';
import { ProjectService } from '../../../services/project.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public numberu: number;
  public numberp : number;
  public numbert : number;
  public chartColor;
  public chartEmail;
  public chartHours;
  canvas: any; ctx: any;
  canvas2: any; ctx2: any; canvas3: any; ctx3: any;
// This will hold our chart info
  chart = [];
  charts = [];
  charts1 = [];
  constructor(private trackingservice: TrackingService, private projectservice: ProjectService, private usersservice: UsersService) {
  }
public removeDuplicates(originalArray, prop) {
  const newArray = [];
  const lookupObject  = {};
  for (const i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }
  for (const i in lookupObject) {
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
            type: 'horizontalBar',
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
                    borderWidth: 2
                }]
            },
            options: {
              responsive: true,
              scales: {
                xAxes: [
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
                yAxes: [
                  {
                    barPercentage : 1,
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
      this.projectservice.gett().subscribe(
        res => {
          const number = Object.keys(res).length;
          this.numbert = number;
         });
      this.projectservice.get().subscribe(
        res => {
          const number = Object.keys(res).length;
          this.numberp = number;
          // for state finished /new / in progress //
          const arr = res.filter(res => res.status === 'New');
          const arr2 = res.filter(res => res.status === 'In progress');
          const arr3 = res.filter(res => res.status === 'Finished');
          const u = this.removeDuplicates(arr, 'status');
          const u2 = this.removeDuplicates(arr2, 'status');
          const u3 = this.removeDuplicates(arr3, 'status');
          const result = u.concat(u2).concat(u3);
          const state = result.map(res => res.status);
          console.log(state);
          // for number of project for different state //
          const l = Object.keys(arr).length;
          const l2 = Object.keys(arr2).length;
          const l3 = Object.keys(arr3).length;
         // convert number to array //
          const array = Array.from(String(l), Number);
          const array2 = Array.from(String(l2), Number);
          const array3 = Array.from(String(l3), Number);
          const result2 = array.concat(array2).concat(array3);
          console.log(result2);
          this.charts = new Chart('canvas2', {
            type: 'pie',
            data: {
              labels: state,
              datasets: [{
                  label: 'Project Status',
                  data: result2,
                  backgroundColor: [
                    'rgba(75, 192, 150, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 150, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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
        }
          }
        });
        }
      );
      this.usersservice.get().subscribe(
        res => {
          const number = Object.keys(res).length;
          this.numberu = number;
          const arr = res.filter(res => res.speciality === 'Data science');
          const arr1 = res.filter(res => res.speciality === 'Artificial intelligence');
          const arr2 = res.filter(res => res.speciality === 'DevOps');
          const arr3 = res.filter(res => res.speciality === 'Software Developement');
          const u = this.removeDuplicates(arr, 'speciality');
          const u1 = this.removeDuplicates(arr1, 'speciality');
          const u2 = this.removeDuplicates(arr2, 'speciality');
          const u3 = this.removeDuplicates(arr3, 'speciality');
          const result = u.concat(u1).concat(u2).concat(u3);
          const speciality = result.map(res => res.speciality);
          console.log(speciality);
          // for number of project for different state //
          const l = Object.keys(arr).length;
          const l1 = Object.keys(arr1).length;
          const l2 = Object.keys(arr2).length;
          const l3 = Object.keys(arr3).length;
         // convert number to array //
          const array = Array.from(String(l), Number);
          const array1 = Array.from(String(l1), Number);
          const array2 = Array.from(String(l2), Number);
          const array3 = Array.from(String(l3), Number);
          const result2 = array.concat(array1).concat(array2).concat(array3);
          console.log(result2);
          this.charts1 = new Chart('canvas3', {
            type: 'pie',
            data: {
                labels: speciality,
                datasets: [{
                    label: '',
                    data: result2,
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
              display: true,
          scales: {

          }
            }
          });  }
          );
      }
      }
