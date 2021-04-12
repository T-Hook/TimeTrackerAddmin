import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
@Component({
  moduleId: module.id,
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: any;
  error: string;
  loading = false;
  form: any = {};
  isIn = false;
  isFailed = false;
  errorMessage = '';
  constructor(private companyservice: CompanyService, private router: Router) { }
  ngOnInit(): void {
  this.getAll();
  }
  public getAll(): void {
  this.companyservice.get()
  .subscribe(
    data => {
      this.companies = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
}

onSubmit() : void {
  this.companyservice.set(this.form).subscribe(
    data => {
      console.log(data);
      this.form = '';
      this.getAll();
      this.gotoList();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isFailed = true;
    }
  );
}
gotoList() {
  this.router.navigate(['/companies']);
}
details(id: number) {
  this.router.navigate(['/company', id]);
}
}
