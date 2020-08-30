import { Coupon } from './../model/coupon';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class CouponService {
    baseUrlServer: string;

    constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrlServer = baseUrl;
    }


    deleteCoupons(id:number):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.delete<any>(this.baseUrlServer + "admin/coupons/delete/"+id,options)
    }

    createCoupon(coupon:Coupon):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.post<any>(this.baseUrlServer +"coupon/create" ,coupon,{ headers });
    }
    getAllCoupon():Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer +"coupons" ,{ headers });
    }

    checkCoupon(coupons:any):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer +"coupons/"+coupons ,{ headers });
    }
}