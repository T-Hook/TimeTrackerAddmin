import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'app/services/users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
   notifications: any;
  isFailed = false;
  errorMessage = '';
  fo: FormGroup;
  users: any;
  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.fo = this.fb.group({
      idUser: [''],
      data: [''],
      date: ['']
    })
  }
  ngOnInit(): void {
    this.getAll();
    this.getAllnotif();
  }
  public getAll(): void {
    this.userService.get()
    .subscribe(
      user => {
        this.users = user;
        console.log(user);
      },
      error => {
        console.log(error);
      });
  }
  public getAllnotif(): void {
    this.userService.getnotif()
    .subscribe(
      notif => {
        this.notifications = notif;
        console.log(notif);
      },
      error => {
        console.log(error);
      });
  }
onSub(): void {
  this.userService.setnotif(this.fo.value).subscribe(
    data => {
   console.log(data);
   console.log(this.fo.value);
   this.getAllnotif();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isFailed = true;
    }
  );
}
delete(id: number) {
  this.userService.deletenotif(id)
    .subscribe(
      data => {
        console.log(data);
        this.getAllnotif();
      },
      error => console.log(error));
}

}
