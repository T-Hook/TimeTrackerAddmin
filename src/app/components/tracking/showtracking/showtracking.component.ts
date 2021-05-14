import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackingService } from 'app/services/tracking.service';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-showtracking',
  templateUrl: './showtracking.component.html',
  styleUrls: ['./showtracking.component.css']
})
export class ShowtrackingComponent implements OnInit {
  public trackings = [];
  public tracking = null;
  indexTrackingShowed = null;
  public trackingId = '';
  error: string;
  loading = false;
  public sub: any;
  pages: any;
  pagination: any = {};
  option = {
      page: 1,
      limit: 16
  };

  constructor(public router: Router, private route: ActivatedRoute, public trackingService: TrackingService) {
    this.sub = this.route.params.subscribe(params => {
      this.trackingId = params['id'];
  }); }

  getTrackingData() {
    this.trackingService.listByTrackingId(this.trackingId, this.option)
        .pipe(first())
        .subscribe(
            data => {
                this.trackings = data.docs;
                this.pages = data.pages;
                this.pagination.total = data.total;
                this.pagination.limit = data.limit;
                this.pagination.page = data.page;
                this.pagination.pages = data.pages;

            },
            error => {
                this.error = error;
                this.loading = false;
            }
        );
}

changeLimitPerPage(limit) {
    this.option.limit = limit;
    this.option.page = 1;
    this.getTrackingData();
}

selectTracking(tracking, index) {

    this.indexTrackingShowed = index;
    this.tracking = tracking;
}

showNextTracking() {

    if (this.indexTrackingShowed < this.trackings.length + 1) {
        this.indexTrackingShowed++;
        this.tracking = this.trackings[this.indexTrackingShowed];
    }

}

showPreviousTracking() {
    if (this.indexTrackingShowed > 0) {
        this.indexTrackingShowed--;
        this.tracking = this.trackings[this.indexTrackingShowed];
    }
}

goToListTracking() {
    this.tracking = null;
    this.indexTrackingShowed = null;
}

changePage(page) {

    this.option.page = page;
    this.getTrackingData();
}

ngOnInit() {

    this.getTrackingData();

}
}
