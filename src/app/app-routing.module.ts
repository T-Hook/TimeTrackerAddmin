import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { UserComponent } from './components/user/user/user.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyusersComponent } from './components/companyusers/companyusers.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProjectComponent } from './components/project/project.component';
import { RbacComponent } from './components/rbac/rbac.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProjectusersComponent } from './components/projectusers/projectusers.component';
import { RoutesComponent } from './components/routes/routes.component';
import { PermissionsComponent } from './components/permissions/permissions.component';


export const AppRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login',      component: LoginComponent },
      { path: 'dashboard',      component: DashboardComponent },
      { path: 'companies',      component: CompaniesComponent },
      { path: 'user',           component: UserComponent },
      { path: 'company/:id',  component: CompanyusersComponent },
      { path: 'notification',  component: NotificationComponent },
      { path: 'rbac',  component: RbacComponent },
      { path: 'project',  component: ProjectComponent },
      { path: 'tasks',  component: TasksComponent },
      { path: 'projectusers/:id',  component: ProjectusersComponent },
      { path: 'route',  component: RoutesComponent },
      { path: 'permissions',  component: PermissionsComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
