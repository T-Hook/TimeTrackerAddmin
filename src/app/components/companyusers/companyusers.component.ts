import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { map } from 'rxjs/operators';
import { UsersService } from 'app/services/users.service';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { data } from 'jquery';
@Component({
  selector: 'app-companyusers',
  templateUrl: './companyusers.component.html',
  styleUrls: ['./companyusers.component.css']
})
export class CompanyusersComponent implements OnInit {
  comp : any;
  users: any;
  rules: any;
  companies: any;
  id: number;
  company: any = {};
  rule: any = {};
  form: any = {};
  isFailed = false;
  errorMessage = '';
  fo: FormGroup;
  Data: Array<any> = [
    { id: '1', value: 'get' , name : 'GET'},
    { id: '2', value: 'put' , name : 'PUT' },
    { id: '3', value: 'post' ,  name : 'POST' },
    { id: '4', value: 'share' , name : 'SHARE'},
    { id: '5', value: 'delete' ,  name : 'DELETE' }
  ];
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private companyService: CompanyService, private userService: UsersService) {
    this.fo = this.fb.group({
      idCompany: [''],
      idUser: [''],
      acl: this.fb.array([]),
      data: ['']
    })
  }
  onCheckboxChange(e) {
    const acl: FormArray = this.fo.get('acl') as FormArray;

    if (e.target.checked) {
      acl.push(new FormControl(e.target.value));
    } else {
      // tslint:disable-next-line:no-inferrable-types
      let i: number = 0;
      acl.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          acl.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
    get formControls() {
      return this.fo.controls;
    }
  ngOnInit(): void {

    this.geta();
    this.getAll();
    this.route.paramMap
    .pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    )
    .subscribe(prodId => {
      this.id = prodId;
      this.companyService.getone(this.id).subscribe(prod => {
      //  console.log(prod);
        this.company = prod;

      });
    });
    this.getcrole();
  }
  update() {
   this.companyService.update(this.id, this.company)
   .subscribe(data => {
  //   console.log(data);
     this.router.navigate(['/companies']);
   }, error => console.log(error));
 }
 public geta(): void {
  this.companyService.get()
  .subscribe(
    data => {
      this.companies = data;
    //  console.log(data);
    },
    error => {
      console.log(error);
    });
}
 public getAll(): void {
  this.userService.get()
  .subscribe(
    user => {
      this.users = user;
      //console.log(user);
    },
    error => {
      console.log(error);
    });
}
public getcrole(): void {
  this.companyService.getuserrolec(this.id)
  .subscribe(
    dataa => {
      this.comp = dataa;
      console.log('show me ! ');
      console.log(dataa);
    },
    error => {
      console.log(error);
    });
}

onSub(): void {
  this.companyService.setuserrole(this.id, this.fo.value).subscribe(
    data => {
   console.log(data);
   console.log(this.fo.value);
   this.getcrole();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isFailed = true;
    }
  );
}


}
