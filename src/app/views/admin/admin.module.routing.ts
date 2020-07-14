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
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
 
export class  AdminRoutingModule{}  