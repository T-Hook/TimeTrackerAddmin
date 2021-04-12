import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../../services/permissions.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RbacService } from 'app/services/rbac.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  per: FormGroup;
  permissions: any;
  routes: any;
  closeResult = '';
  permission: any = {};
  isFailed = false;
  errorMessage = '';
  id: number;
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private rbacservice: RbacService, private permissionsservice: PermissionsService, private modalService: NgbModal) {
    this.per = this.fb.group({
      idPermission: [''],
      idRoute: ['']
    })
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllroutes();
  }
public getAll(): void {
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
public getAllroutes(): void {
  this.rbacservice.getroutes()
  .subscribe(
    data => {
      this.routes = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
}
addpermission(): void {
  this.permissionsservice.setpermission(this.permission).subscribe(
   data => {
   console.log(data);
   this.permission = '';
   this.getAll();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isFailed = true;
    }
  );
}

onSubper(): void {
  this.permissionsservice.setpermissionroute(this.per.get('idPermission').value, this.per.get('idRoute').value).subscribe(
    data => {
   console.log(data);
   console.log(this.per.get('idPermission').value);
   console.log(this.per.value);
   this.per.reset();
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

deleteper(id: number) {
  this.permissionsservice.deleteper(id)
    .subscribe(
      data => {
        console.log(data);
        this.getAll();
      },
      error => console.log(error));
}
}
