import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Sobre',
      icon: 'info',
      routeUrl: '/about'
    }
    window.scrollTo(0, 0);
   }

  ngOnInit(): void {
  }

}
