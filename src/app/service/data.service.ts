import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private productId = new BehaviorSubject(1);
    id = this.productId.asObservable();
  
    constructor() { }
  
    changeProductId(id: number) {
      this.productId.next(id)
    }

    private dropdownValue: Subject<string> = new Subject();

    public getDropdownValue() : Observable<any>{
        return this.dropdownValue.asObservable();
    }

    public setDropdownValue(value: string) : void {
        this.dropdownValue.next(value);
    }

    private cartValue: Subject<string> = new Subject();

    public getcartValue() : Observable<any>{
        return this.cartValue.asObservable();
    }

    public setcartValue(value: string) : void {
        this.cartValue.next(value);
    }


}
