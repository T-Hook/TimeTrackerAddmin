import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { FixedPluginModule } from './components/fixedplugin/fixedplugin/fixedplugin.module';
import { FooterModule } from './components/footer/footer/footer.module';
import { NavbarModule } from './components/navbar/navbar/navbar.module';
import { SidebarModule } from './components/sidebar/sidebar/sidebar.module';
import { UserComponent } from './components/user/user/user.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home.component';
import { authInterceptorProviders } from './interceptor/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyusersComponent } from './components/companyusers/companyusers.component';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationComponent } from './components/notification/notification.component';
import { RbacComponent } from './components/rbac/rbac.component';
import { ProjectComponent } from './components/project/project.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProjectusersComponent } from './components/projectusers/projectusers.component';
import { RulesComponent } from './components/rules/rules.component';
import { RoutesComponent } from './components/routes/routes.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { PlanComponent } from './components/plan/plan.component';
import { SprintsComponent } from './components/sprints/sprints.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { ShowtrackingComponent } from './components/tracking/showtracking/showtracking.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    CompaniesComponent,
    CompanyusersComponent,
    NotificationComponent,
    RbacComponent,
    ProjectComponent,
    TasksComponent,
    ProjectusersComponent,
    RulesComponent,
    RoutesComponent,
    PermissionsComponent,
    SearchFilterPipe,
    PlanComponent,
    SprintsComponent,
    TrackingComponent,
    ShowtrackingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    HttpClientModule,
    FixedPluginModule
  ], providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
