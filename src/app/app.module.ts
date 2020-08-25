import { ForgetComponent } from './views/user/forget-password/forget.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './share.module';
import { HttpClient, HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './views/user/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './views/user/register/register.component';
import { HeaderComponent } from './views/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    RegisterComponent,
    HeaderComponent,
    ForgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: 'BASE_URL',
    useFactory: getBaseUrl
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl(){
  return 'http://localhost:8080/';
}
