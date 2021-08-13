import { Component } from "@angular/core";
import { Routes } from "@angular/router";

@Component({
    template: `Admin`
})
export class AdminComponent {
}

@Component({
    template: `Login`
})
export class LoginComponent {
}

@Component({
    template: `Boxfill`
})
export class BoxfillComponent {
}

@Component({
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}

export const routes: Routes = [
    {path: '', redirectTo: 'view1', pathMatch: 'full'},
    { path: 'view1', component: BoxfillComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent }
];
