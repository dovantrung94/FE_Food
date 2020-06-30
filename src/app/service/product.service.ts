import { Observable } from 'rxjs';
import { Injectable, Inject } from "@angular/core";
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

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

}
