import { Observable } from 'rxjs';
import { Injectable, Inject, TemplateRef } from "@angular/core";
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class ToastService {

    constructor(private toastr: ToastrService) { }

    showSuccess(message, title){
        this.toastr.success(message, title)
    }
    showError(message, title){
        this.toastr.error(message, title)
    }
    
    showInfo(message, title){
        this.toastr.info(message, title)
    }
    
    showWarning(message, title){
        this.toastr.warning(message, title)
    }
}