import { Product } from './../model/product';
import { Observable } from 'rxjs';
import { Injectable, Inject } from "@angular/core";
import { User } from '../model/user';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    baseUrlServer: string;

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrlServer = baseUrl;
    }

    getListProduct():Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer +"products" ,{ headers });
    }

    getProductDetail(id:Number):Observable<any>{
        debugger;
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
     return this.httpClient.get<any>(this.baseUrlServer + "product/"+id,options)
    }

    createProduct(product:Product):Observable<any>{ 
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.post<any>(this.baseUrlServer +"admin/product/upload" ,product,{ headers });
    }

    getProductNew():Observable<Product>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<Product>(this.baseUrlServer + "admin/product/new",options);
    }

    uploadImageProduct(image:File):Observable<any>{
        debugger;
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        headers.append('Content-Type', 'multipart/form-data');
        const options = {
            headers: headers
        };
        let params = new FormData(); 
        params.append('image', image);
        return this.httpClient.post<Product>(this.baseUrlServer + "admin/product/upload/image",params,options);
    }
}
