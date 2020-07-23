import { Component, OnInit} from '@angular/core';
import {routeAnimation} from '../../app-page-animation';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [routeAnimation]
})
export class SidebarComponent implements OnInit {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  opened = true;
  constructor( ) { }

  ngOnInit(): void {
    console.log( $(window) );
  }

  getState(outlet){
    return outlet.activatedRouteData.state;
  }
}
