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
        return this.httpClient.get<User[]>(this.baseUrlServer + "admin/user",options)
    }

    createUserByAdmin(user:User):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.post<any>(this.baseUrlServer + "admin/user",user,options)
    }

    getUserInfo():Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<User[]>(this.baseUrlServer + "user/detail",options)
    }

    updateUser(user:User,image:File):Observable<any>{

        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        headers.append('Content-Type', 'multipart/form-data');
        const options = {
            headers: headers
        };
        let params = new FormData();
        if(image !=null){
            params.append('image',image);
        }
        params.append('email',user.email);
        params.append('username',user.username);
        params.append('sex',user.sex);
        params.append('address',user.address);

        return this.httpClient.put<any>(this.baseUrlServer + "user/profile/update",params,options);
    }
}