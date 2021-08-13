import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component';
import { CarttextareaComponent } from './components/carttextarea/carttextarea.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { AdminComponent } from './components/admin/admin.component';
import { BoxfillComponent } from './components/boxfill/boxfill.component';
import { LoginComponent } from './components/login/login.component';
import { EditdocComponent } from './components/editdoc/editdoc.component';
import { ShareModule } from '../app/share/share.module'
import { ProductService } from './share/services/product.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AngularFireAuthModule, USE_EMULATOR as AUTH_EMULATOR } from '@angular/fire/auth'

@NgModule({
  declarations: [
    AppComponent,
    GenericDialogComponent,
    CarttextareaComponent,
    ImageDialogComponent,
    AdminComponent,
    BoxfillComponent,
    LoginComponent,
    EditdocComponent
  ],
  imports: [
    BrowserModule,
    ShareModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule
  ],
  providers: [   
    ProductService,
{ provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
{
      provide: AUTH_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 9099],
    },
  ],
  entryComponents: [
    GenericDialogComponent,
    ImageDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
