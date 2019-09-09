import { MaterialModule } from './shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Routes
import { APP_ROUTES } from './app.routes';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserComponent } from './pages/user/user.component';
import { AssignComponent } from './pages/user/assign/assign.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    NavbarComponent,
    PagesComponent,
    RegisterComponent,
    DashboardComponent,
    TasksComponent,
    UserComponent,
    AssignComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    APP_ROUTES
  ],
  exports: [ TasksComponent, AssignComponent ],
  entryComponents: [ TasksComponent, AssignComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
