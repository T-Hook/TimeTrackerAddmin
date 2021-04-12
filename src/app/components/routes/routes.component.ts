import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RbacService } from 'app/services/rbac.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  searchTerm: string;
  closeResult = '';
  routes: any;
  allroutes: any;
  route: any = {};
  isFailed = false;
  errorMessage = '';
  constructor(private rbacservice: RbacService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllroutes();
  }
  addroute(): void {
    this.rbacservice.setroute(this.route).subscribe(
      data => {
     console.log(data);
     this.route = '';
     this.getAllroutes();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }
  deleteroute(id: number) {
    this.rbacservice.deleteroute(id)
      .subscribe(
        data => {
          console.log(data);
          this.getAllroutes();
        },
        error => console.log(error));
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public getAllroutes(): void {
    this.rbacservice.getroutes()
    .subscribe(
      data => {
        this.routes = data;
        this.allroutes = this.routes;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  search(value: string): void {
    this.routes = this.allroutes.filter((val) => val.name.toLowerCase().includes(value));
  }
}
