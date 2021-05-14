import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackingService } from 'app/services/tracking.service';
import { first } from "rxjs/operators";
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  public trackings = [];
  error: string;
  loading = false;
  public template ={
      panel:{
          header:{
              bgc:"bgc-light-blue-400",
              btnColor:"bgc-light-blue-400",
              btnIcon:"ti-view-list"
          }
      }
  };
  constructor(public router: Router, public trackingservice: TrackingService) { }

  ngOnInit(): void {
    this.trackingservice.get()
    .pipe(first())
    .subscribe(
        data => {
            this.trackings = data;
        },
        error => {
            this.error = error;
            this.loading = false;
        }
    );
  }

}
