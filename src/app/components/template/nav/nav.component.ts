import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('sidenav') sidenv?: MatSidenav;
  mobile = false;
  constructor(private breakpointObserver: BreakpointObserver, private sidenavService: SidenavService) {
    Breakpoints.XSmall = '(max-width: 710px)'
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      const breakpoints = result.breakpoints;

       if (breakpoints[Breakpoints.XSmall]) {
        this.toggle(this.sidenv)
        this.toggleMode(this.sidenv, true);
        this.mobile = true;
      }
      else {
        this.toggle(this.sidenv)
        this.toggleMode(this.sidenv);
        this.mobile = false;
      }
    });
   }

  ngOnInit(): void {
    if(window.innerWidth < 768) {
      this.mobile = true;
    }
  }
  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenv);
  }

  toggleMode(nav: any, isMobile: boolean = false) {
    if(nav) {
      nav.mode = isMobile ? 'push' : 'side';
    }

  }
  toggle(nav: any) {
      if(nav){
        nav.toggle();
      }
  }


}
