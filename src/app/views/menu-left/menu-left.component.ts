import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {
  detailUser = false;
  listData = [
      {
          id : 1,
          link : 'dashboard',
          tab : 'Dashboard',
          img: 'list.png'
      },
      {
          id : 2,
          link : '',
          tab : 'Components',
          img: 'list.png',
          child : [
              {
                  link : '',
                  tab : 'Buttons',
                  short: 'B'
              },
              {
                  link : '',
                  tab : 'Grid System',
                  short: 'GS'
              },
              {
                  link : '',
                  tab : 'Panels',
                  short: 'P'
              }
          ]
      },
      {
          id : 3,
          link : '',
          tab : 'Form',
          img: 'list.png',
          child : [
            {
                link : '',
                tab : 'Regular Forms',
                short: 'RF'
            },
            {
                link : '',
                tab : 'Extended Forms',
                short: 'EF'
            },
            {
                link : '',
                tab : 'Validation Forms',
                short: 'VF'
            },
            {
                link : '',
                tab : 'Wizard',
                short: 'W'
            }
        ]
      },
      {
          id : 4,
          link : '',
          tab : 'Tables',
          img: 'list.png'
      },
      {
          id : 5,
          link : '',
          tab : 'Maps',
          img: 'list.png'
      },
      {
          id : 6,
          link : '',
          tab : 'Charts',
          img: 'list.png'
      }
  ];
  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  logout() {
      localStorage.removeItem('userLogin');

      this.router.navigate(['login']);
  }

  showDetailTab (value) {
      if (value.child) {
          $('#listItem' + value.id).slideToggle('slow');
          if (!value.show) {
              value.show = false;
          }
          value.show = !value.show;
      } else {
          // go to new tab
          this.router.navigate(['home/' + value.link]);

      }
  }


  showDetailUser () {
      $('.box-infor').slideToggle('slow');
      this.detailUser = !this.detailUser;
  }

}
