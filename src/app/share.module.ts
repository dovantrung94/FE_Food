import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SafePipe

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule

    ],
    exports: [
        SafePipe,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ShareModule { }
