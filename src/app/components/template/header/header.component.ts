import { Component, OnInit, ViewChild, ElementRef,  } from '@angular/core';

import { HeaderService } from 'src/app/services/header.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  toggleActive = false;
  constructor(private headerService: HeaderService, private sidenav: SidenavService) { }

  ngOnInit(): void {
  }
  get title():string {
    return this.headerService.headerData.title
  }

  get icon():string {
    return this.headerService.headerData.icon
  }

  get routeUrl():string {
    return this.headerService.headerData.routeUrl
  }

  toggleSidenav() {
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
}

  cart_open = false;

  toggleCart(){
  this.cart_open = !this.cart_open;

  }
}
