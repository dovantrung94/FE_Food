import { User } from './../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class UserService {
    baseUrlServer: string;

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrlServer = baseUrl;
    }

    getAllUser():Observable<User[]>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<User[]>(this.baseUrlServer + "admin/user?page=1&size=10",options)
    }
}