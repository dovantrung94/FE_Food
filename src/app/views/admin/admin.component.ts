import { Component, OnInit } from '@angular/core';
import { navItems } from '../../model/_nav';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  minimized = false;
  public navItems = [...navItems];
  toggleMinimize(e) {
    this.minimized = e;
  }

  constructor() { }

  ngOnInit(): void {
    document.body.style.background = '#e4e5e6';
  }

}
