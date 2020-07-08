import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {
  @Input()
  sidenav: any;
  slideToggle = true;

  constructor() { }

  ngOnInit(): void {
  }

  slideToggleFunc(): void{
    this.slideToggle = !this.slideToggle;
  }

}
