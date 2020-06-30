import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class LoginGuard implements CanActivate {
    //kiểm tra xem đã đăng nhập chưa nếu rồi thì chuyển về home luôn ,chưa thì trả về true
    constructor(private router: Router) {

    }
    canActivate(): boolean {
        const userLogin = localStorage.getItem('userLogin');
        if (userLogin !== null) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }
}