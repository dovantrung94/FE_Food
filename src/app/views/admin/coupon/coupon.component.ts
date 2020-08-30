import { ToastService } from './../../../service/toast.service';
import { error } from '@angular/compiler/src/util';
import { data } from 'jquery';
import { Coupon } from './../../../model/coupon';
import { CouponService } from './../../../service/coupon.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  p: number = 1;
  listCoupon=[];
  editCoupon: FormGroup;
  submitted = false;
  coupon =new Coupon();
  constructor(private couponService:CouponService,
    private fb:FormBuilder,
    private toastService:ToastService
    ) { }

  ngOnInit(): void {

    this.loadAll();
    
    this.editCoupon=this.fb.group({
      couponCount:[10,Validators.required],
      couponMoney:[10000,Validators.required]
    })

  }

  loadAll(){
    this.couponService.getAllCoupon().subscribe(data=>{
      this.listCoupon=data;
    },error =>{

    })
  }

  get f() { return this.editCoupon.controls; }
  createCoupon(){
    this.submitted = true;

    if (this.editCoupon.invalid) {
        return;
    }
    this.coupon = Object.assign(this.coupon,this.editCoupon.value);
    this.couponService.createCoupon(this.coupon).subscribe(data=>{
      $('#createCoupon').modal('hide');
      this.toastService.showSuccess("Success","Add Coupons Success");
      this.loadAll;
    },error=>{

    })
  }

  deleteCoupon(id:number){
    this.couponService.deleteCoupons(id).subscribe(data=>{
      this.toastService.showSuccess("Success","Delete Success");
      this.loadAll();
    },error=>{
      this.toastService.showError("Error","Delete Error");
    })
  }

}
