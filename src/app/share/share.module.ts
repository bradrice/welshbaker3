import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider'; 
import {MatFormFieldModule} from '@angular/material/form-field'; ``
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    AngularFireAuthModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    MatListModule,   
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class ShareModule { }
