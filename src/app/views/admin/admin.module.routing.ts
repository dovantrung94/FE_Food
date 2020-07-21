import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './../../guard/auth.guard';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';

import { Routes, RouterModule, Router } from "@angular/router";

import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate : [AuthGuard],
        children: [
            {
                path: '',
                component: ProductComponent
            },
            {
                path:'category',
                component: CategoryComponent
            }, 
            {
                path:'user',
                component: UserComponent
            },
            {
                path:'logout',
                component: LogoutComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
 
export class  AdminRoutingModule{}  