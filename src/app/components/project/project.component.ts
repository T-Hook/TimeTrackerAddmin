import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'app/services/company.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: any;
  companies: any;
  error: string;
  loading = false;
  form: any = {};
  isIn = false;
  isFailed = false;
  errorMessage = '';

  constructor(private companyservice: CompanyService, private projectservice: ProjectService , private router: Router) { }

  ngOnInit(): void {
    this.getAllpro();
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
  public getAllpro(): void {
    this.projectservice.get()
    .subscribe(
      data => {
        this.projects = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  onSubmit(): void {
    this.projectservice.set(this.form).subscribe(
      data => {
        console.log(data);
        this.form = '';
        this.getAllpro();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }

  details(id: number) {
    this.router.navigate(['/projectusers', id]);
  }
  delete(id: number) {
    this.projectservice.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.getAllpro();
        },
        error => console.log(error));
  }

}
