import { Order } from './../model/order';
import { Cart } from './../model/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class OrderService {

    baseUrlServer: string;

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrlServer = baseUrl;
    }

    paymentCart(order:Order):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.post<any>(this.baseUrlServer +"pay",order,{ headers });
    }

    getAllOrderByAdmin():Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer +"admin/order?page=0&size=10",{ headers });
    }
}