import { ShareModule } from './../../share.module';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { AuthGuard } from './../../guard/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from "@angular/router";


// const routes: Routes = [
//   {
//       path: '',
//       // component: HomePageComponent,
//       canActivate: [AuthGuard],
//       children: [
//           {
//               path: '',
//               component: HomeComponent
//           }
//       ]
//   }
// ]

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent}

];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
