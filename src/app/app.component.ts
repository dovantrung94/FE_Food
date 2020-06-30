import { Component, OnInit, OnDestroy} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'TrungProject';
    route: string;
    url;
    showMenu;

    constructor(
        location: Location,
        private router: Router
    ) {
        this.router.events.subscribe(val => {
            this.url = val['url'];
            if (location.path() !== '') {
                this.route = location.path();
                const indexRemove = location.path().indexOf('?');
                if (indexRemove !== -1) {
                    const beforePath = location.path().split('?')[0];
                    if (!beforePath) {
                        this.route = '/login';
                    }
                }

            } else {
                this.route = '/login';
            }

            if (this.route === '/login' || this.route === '/register') {
                this.showMenu = false;
            } else {
                this.showMenu = true;

            }

            if (val instanceof NavigationEnd) {
                if (val.url == '/login' || val.url == '/register' || val.url == '/') {
                    document.body.style.backgroundImage  = 'url(assets/images/bg_login.jpg)';
                } else {
                    document.body.style.background = '#F4F4F4';
                }
            }
        });
    }
}
