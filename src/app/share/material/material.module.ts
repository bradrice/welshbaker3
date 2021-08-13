import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const MaterialComponents = [
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatGridListModule,
  MatStepperModule,
  MatRadioModule,
  MatTabsModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }