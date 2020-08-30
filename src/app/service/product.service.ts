import { UploadFile } from './../model/uploadFile';
import { ProductReview } from './../model/product_review';
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

    getProductTrending():Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer +"products/trending" ,{ headers });
    }

    getProductNewHome():Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer +"products/new" ,{ headers });
    }

    getProductNewDetail():Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer +"products/new/detail" ,{ headers });
    }


    getProductDetail(id:Number):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
     return this.httpClient.get<any>(this.baseUrlServer + "product/"+id,options)
    }

    deleteProduct(id:Number,productDetailid:number):Observable<any>{
        debugger;
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
     return this.httpClient.delete<any>(this.baseUrlServer + "products/delete?id="+id+"&productDetailId="+productDetailid,options)
    }

    createProduct(product:Product):Observable<any>{ 
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.post<any>(this.baseUrlServer +"admin/product/upload" ,product,{ headers });
    }

    updateProduct(product:Product):Observable<any>{ 
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.put<any>(this.baseUrlServer +"product/update" ,product,{ headers });
    }

    getProductNew():Observable<Product>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<Product>(this.baseUrlServer + "admin/product/new",options);
    }
    

    uploadProduct(product:Product,image:File):Observable<any>{
        debugger;
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        headers.append('Content-Type', 'multipart/form-data');
        const options = {
            headers: headers
        };
        let params = new FormData(); 
        console.log()
        params.append('image', image);
        params.append('name',product.name);
        params.append('price',String(product.price));
        if(product.priceSale != null){
        params.append('priceSale',String(product.priceSale));
        }
       
        params.append('categoryId',String(product.categoryId));
        params.append('content',product.content);
        if(product.weight != null){
            params.append('weight',String(product.weight));
        }
        if(product.composition != null){
            params.append('composition',String(product.composition));
        }
        params.set('description',product.description);
        params.set('color',product.color);
        console.log(params);
        
        return this.httpClient.post<Product>(this.baseUrlServer + "admin/product/upload",params,options);
    }

    searchProduct(keyword:string):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<Product>(this.baseUrlServer + "product/search/user?keyword="+keyword,options);
    }

    addComment(productReview:ProductReview){
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.post<any>(this.baseUrlServer +"user/addComment" ,productReview,{ headers });
    }

    geListtProductSortNew(key:number):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',  localStorage.getItem("token").split('"')[1]);
        const options = {
            headers: headers
        };
        return this.httpClient.get<any>(this.baseUrlServer + "admin/sort/"+key,options);
    }
}
