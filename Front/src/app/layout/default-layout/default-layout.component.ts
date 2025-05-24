import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { INavData } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';
import { decodeToken } from '../../util/auth-token.util'; 

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})


export class DefaultLayoutComponent {
  public navItems: INavData[] = [];  // <-- Typage explicite

  constructor() {
    this.filterNavItemsByRole();
  }

  filterNavItemsByRole() {
    const tokenPayload = decodeToken();
    const userRole = tokenPayload?.role || 'GUEST';

    this.navItems = navItems.filter(item => {
      if (!item.roles || item.roles.length === 0) return true;
      return item.roles.includes(userRole);
    });
  }
}
