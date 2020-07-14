import { Product } from './../model/product';
import { Observable } from 'rxjs';
import { Injectable, Inject } from "@angular/core";
import { User } from '../model/user';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    baseUrlServer: string;

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrlServer = baseUrl;
    }

    getProductDetail():Observable<any>{
     return this.httpClient.get<any>(this.baseUrlServer + "menu")
    }

    createProduct(product:Product):Observable<any>{ 
        const headers = { "Authorization": "bearer=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cnVuZ2R2MTIiLCJleHAiOjE1OTQ0NzkzNTksInVzZXJJZCI6NCwiaWF0IjoxNTk0NDYxMzU5LCJlbWFpbCI6InRydW5nZHYyOTRAZ21haWwuY29tIn0.r2tB1gHjT-r6e8wSnQ_S-bDdYt0d3ua1wDgS2uJay9suq4GGkh_zQofF3ddyopVf-9u4ztZPkNHmAvqyBEhy7A" }
        return this.httpClient.post<any>(this.baseUrlServer +"admin/product" ,product,{ headers });
    }
}
