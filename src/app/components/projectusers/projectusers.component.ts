import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { map } from 'rxjs/operators';
import { UsersService } from 'app/services/users.service';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { data } from 'jquery';
import { SprintsService } from 'app/services/sprints.service';
import { DataLayer } from '@ngui/map';

@Component({
  selector: 'app-projectusers',
  templateUrl: './projectusers.component.html',
  styleUrls: ['./projectusers.component.css']
})
export class ProjectusersComponent implements OnInit {
  proj: any;
  sprints: any;
  companies: any;
  tasks: any;
  tasksfilter: any;
  users: any;
  projects: any;
  id: number;
  project: any = {};
  sprint: any = {};
  form: any = {};
  isFailed = false;
  Message = '';
  errorMessage = '';
  ft: FormGroup;
  fo: FormGroup;
  Data: Array<any> = [
    { id: '1', value: 'get' , name : 'GET'},
    { id: '2', value: 'put' , name : 'PUT' },
    { id: '3', value: 'post' ,  name : 'POST' },
    { id: '4', value: 'share' , name : 'SHARE'},
    { id: '5', value: 'delete' ,  name : 'DELETE' }
  ];

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private sprintservice: SprintsService, private route: ActivatedRoute, private router: Router, private companyService: CompanyService, private userService: UsersService, private projectservice: ProjectService) {
    this.fo = this.fb.group({
      idProject: [''],
      idUser: [''],
      acl: this.fb.array([]),
      data: ['']
    })
    this.ft = this.fb.group({
      name: [''],
      description: [''],
      type: [''],
      datestart: [''],
      dateend: [''],
      status: [''],
      state: [''],
      idUser: [''],
      idProject: [''],
      idCompany: ['']
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
    this.route.paramMap
    .pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    )
    .subscribe(prodId => {
      this.id = prodId;
      this.projectservice.getone(this.id).subscribe(prod => {
      //  console.log(prod);
        this.project = prod;

      });
    });
    this.geta();
    this.getAll();
    this.getAllc();
    this.gettasks();
    this.getsprints();
    this.getprole();
    this.gettasksfilter();
  }
  update() {
   this.projectservice.update(this.id, this.project)
   .subscribe(data => {
  //   console.log(data);
     this.router.navigate(['/project']);
   }, error => console.log(error));
 }
 public geta(): void {
  this.projectservice.get()
  .subscribe(
    data => {
      this.projects = data;
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
      this.users = user; // console.log(user);
    },
    error => {
      console.log(error);
    });
}
public getAllc(): void {
  this.companyService.get()
  .subscribe(
    data1 => {
      this.companies = data1;
    // console.log(data1);
    },
    error => {
      console.log(error);
    });
}
public gettasks(): void {
  this.projectservice.gettasks(this.id)
  .subscribe(
    data => {
      this.tasks = data;
       console.log("tasks:");
     console.log(data);
    },
    error => {
      console.log(error);
    });
}
public removeDuplicates(originalArray, prop) {
  let newArray = [];
  let lookupObject  = {};

  for (const i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (var i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}
public gettasksfilter(): void {
  this.projectservice.gettasks(this.id)
  .subscribe(
    // tslint:disable-next-line:no-shadowed-variable
    data => {
// tslint:disable-next-line:prefer-const
var uniqueArray = this.removeDuplicates(data, '_id');
      this.tasksfilter = uniqueArray;
       console.log('tasksfilter:');
     console.log(data);
    },
    error => {
      console.log(error);
    });
}
onsubsprint(): void {
  this.sprintservice.set(this.id, this.sprint).subscribe(
    data => {
      console.log(data);
      this.sprint = '';
      this.getsprints();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isFailed = true;
    }
  );
}
public getsprints(): void {
  this.sprintservice.getsprints(this.id)
  .subscribe(
    dataa => {
      this.sprints = dataa;
      console.log('show me !!!!');
     console.log(dataa);
    },
    error => {
      console.log(error);
    });
}
public getprole(): void {
  this.projectservice.getuserrolec(this.id)
  .subscribe(
    dataa => {
      this.proj = dataa;
  console.log('show me users in this project ! ');
  console.log(dataa);
    },
    error => {
      console.log(error);
    });
}

onSub(): void {
  this.projectservice.setuserrolepro(this.id, this.fo.value).subscribe(
    data => {
   console.log(data);
   console.log(this.fo.value);
   this.fo.reset();
   this.getprole();
    },
    err => {
      this.errorMessage = err.error.message;

    }
  );
}

onSubtask(): void {
  this.projectservice.settask(this.id, this.ft.value).subscribe(
  data => {
   console.log(data);
   console.log('show me values of task!')
   console.log(this.ft.value);
   this.ft.reset();
   this.gettasks();
   this.gettasksfilter();
    },
    err => {
      this.errorMessage = err.error.message;

    }
  );
}
deletetask(id: number) {
  this.projectservice.deletetasks(id)
    .subscribe(
      data => {
        console.log(data);
        this.gettasks();
        this.gettasksfilter();
      },
      error => console.log(error));
}
deletesprint(id: number) {
  this.sprintservice.delete(id)
    .subscribe(
      data => {
        console.log(data);
        this.getsprints();
      },
      error => console.log(error));
}
}
