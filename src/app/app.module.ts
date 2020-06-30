import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './share.module';
import { HttpClient, HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './views/user/login/login.component';
import { MenuLeftComponent } from './views/menu-left/menu-left.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuLeftComponent,
    DashboardComponent
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
