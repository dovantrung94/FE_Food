import { Category } from './../model/category';
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
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer + "category",options)
    }
    
    createCategory(category:Category):Observable<any>{
        debugger;
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.post<any>(this.baseUrlServer + "category",category,options);
    }

    deleteCategory(id:number):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.delete<any>(this.baseUrlServer + "admin/category/delete/"+id,options)
    }

    updateCategory(category:Category):Observable<any>{
        debugger;
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.post<any>(this.baseUrlServer + "category/update",category,options);
    }
  
}