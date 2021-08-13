import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { BoxfillComponent } from './components/boxfill/boxfill.component';
import { AuthGuardService } from './share/services/authguard.service';
import { EditdocComponent } from './components/editdoc/editdoc.component';


const routes: Routes = [
  {
    path: '', redirectTo: '/view1', pathMatch: 'full'
  },
  {
    path: 'view1',
    component: BoxfillComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'edit/:type/:id',
      component: EditdocComponent,
      canActivate : [AuthGuardService]
  },
  {
    path: 'edit/:type',
      component: EditdocComponent,
      canActivate : [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
