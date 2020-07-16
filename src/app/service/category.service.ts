import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    baseUrlServer: string;

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrlServer = baseUrl;
    }

    getAllCategory():Observable<any>{
        debugger;
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token"));
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer + "category",options)
    }

  
}