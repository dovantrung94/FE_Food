import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
}
