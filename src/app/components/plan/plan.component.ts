import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from 'app/services/company.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  plan: FormGroup;
  plans: any;
  rule: any = {};
  rules: any;
  error: string;
  loading = false;
  form: any = {};
  isIn = false;
  isFailed = false;
  errorMessage = '';
  closeResult = '';

  // tslint:disable-next-line:max-line-length
  constructor(private planservice: PlanService, private companyService: CompanyService, private fb: FormBuilder, private modalService: NgbModal) {
    this.plan = this.fb.group({
      idplan: [''],
      idrule: ['']
    })
   }

  ngOnInit(): void {
this.getAllplans();
this.getrule();
  }
  public getAllplans(): void {
    this.planservice.getplans()
    .subscribe(
      data => {
        this.plans = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  onSubmit(): void {
    this.planservice.setplan(this.form).subscribe(
      data => {
        console.log(data);
        this.form = '';
        this.getAllplans();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }
  onSub(): void {
    this.planservice.addruleplan(this.plan.get('idplan').value, this.plan.get('idrule').value).subscribe(
      data => {
     console.log(data);
     console.log(this.plan.value);
     this.plan.reset();
     this.getAllplans();
      },
      err => {
        this.errorMessage = err.error.message;

      }
    );
  }
 addrule(): void {
  this.companyService.setrule(this.rule).subscribe(
    data => {
   console.log(data);
   this.rule = '';
   this.getrule();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isFailed = true;
    }
  );
}
public getrule(): void {
  this.companyService.getrule()
  .subscribe(
    data => {
      this.rules = data;
      console.log("show me rules in this company !!");
      console.log(data);
    },
    error => {
      console.log(error);
    });
}

deleterule(id: number) {
  this.companyService.deleterule(id)
    .subscribe(
      data => {
        console.log(data);
        this.getrule();
      },
      error => console.log(error));
}
delete(id: number) {
  this.planservice.delete(id)
    .subscribe(
      data => {
        console.log(data);
        this.getAllplans();
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
}
