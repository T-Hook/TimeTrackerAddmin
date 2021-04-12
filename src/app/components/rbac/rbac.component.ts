import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionsService } from 'app/services/permissions.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RbacService } from 'app/services/rbac.service';

@Component({
  selector: 'app-rbac',
  templateUrl: './rbac.component.html',
  styleUrls: ['./rbac.component.css']
})
export class RbacComponent implements OnInit {
  id: number;
  rbacc: FormGroup;
  permissions: any;
  rbacs: any;
  rbac: any = {};
  error: string;
  loading = false;
  isIn = false;
  isFailed = false;
  errorMessage = '';
  closeResult = '';
   // tslint:disable-next-line:max-line-length
   constructor(private fb: FormBuilder, private rbacservice: RbacService, private permissionsservice: PermissionsService, private modalService: NgbModal) {
    this.rbacc = this.fb.group({
      idRbac: [''],
      idPermission: ['']
    })
  }
  ngOnInit(): void {
    this.getAll();
    this.getAllpermissions();
  }
  public getAllpermissions(): void {
    this.permissionsservice.get()
    .subscribe(
      data1 => {
        this.permissions = data1;
      console.log(data1);
      },
      error => {
        console.log(error);
      });
  }
  public getAll(): void {
    this.rbacservice.get()
    .subscribe(
      data => {
        this.rbacs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  addrbac(): void {
    this.rbacservice.addrbac(this.rbac).subscribe(
     data => {
     console.log(data);
     this.rbac = '';
     this.getAll();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }
  onSubrbac(): void {
    this.rbacservice.addpermissionrbac(this.rbacc.get('idRbac').value, this.rbacc.get('idPermission').value).subscribe(
      data => {
     console.log(data);
     console.log(this.rbacc.value);
     this.rbacc.reset();
     this.getAll();
      },
      err => {
        this.errorMessage = err.error.message;

      }
    );
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

}
