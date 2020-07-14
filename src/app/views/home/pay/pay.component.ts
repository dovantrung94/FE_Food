import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

    constructor(
        private router: Router,

    ) { }

    ngOnInit(): void {
    }

    goToConfirm () {
        this.router.navigate(['home/confirm']);
    }

}
