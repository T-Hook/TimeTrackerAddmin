import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-user',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  users: any;
  error: string;
  loading = false;
  form: any = {};
  isIn = false;
  isFailed = false;
  errorMessage = '';
  constructor(private userService: UsersService) { }
  ngOnInit(): void {
    this.getAll();
    }
    public getAll(): void {
      this.userService.get()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    }
onSubmit(): void {
  this.userService.set(this.form).subscribe(
    data => {
      console.log(data);
      this.form = '';
      this.getAll();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isFailed = true;
    }
  );
}
delete(id: number) {
  this.userService.delete(id)
    .subscribe(
      data => {
        console.log(data);
        this.getAll();
      },
      error => console.log(error));
}
}
