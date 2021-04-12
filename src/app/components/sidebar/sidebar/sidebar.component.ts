import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-chart-bar-32',       class: 'Home' },
    { path: '/companies',     title: 'Companies',         icon: 'nc-bank',               class: '' },
    { path: '/user',          title: 'User Profile',      icon: 'nc-badge',              class: '' },
    { path: '/project',       title: 'Projects',          icon: 'nc-single-copy-04',     class: '' },
    { path: '/notification',  title: 'Notifications',     icon: 'nc-bell-55',            class: '' },
    { path: '/rbac',          title: 'RBAC',              icon: 'nc-bullet-list-67',      class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
