import { Observable } from 'rxjs';
import { Injectable, Inject } from "@angular/core";
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    baseUrlServer: string;
    // user: User;
    constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
        this.baseUrlServer = baseUrl;
    }

  login(email: string, passWord: string): Observable<any> {
        
        let user = { email : email ,
            password : passWord
        };

        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(user);
        return this.httpClient.post<any>(this.baseUrlServer + 'authenticate',body,{'headers':headers});
    }   

}
