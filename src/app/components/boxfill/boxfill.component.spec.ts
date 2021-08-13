import { BoxfillComponent } from './boxfill.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { MatRadioChange } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

describe('BoxfillComponent', () => {
  let component: BoxfillComponent;
  let fixture: ComponentFixture<BoxfillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            CommonModule,
            RouterTestingModule
          ],
          providers: [
            {provide: MatDialog, useValue: {}},
            {provide: ActivatedRoute, useValue: {}}
          ],
          declarations: [
          BoxfillComponent
          ]
    }).compileComponents();
    fixture = TestBed.createComponent(BoxfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    }));


it('boxfill should be created', () => {
    expect(component).toBeTruthy();
});

it('boxfill box size should not be set', () => {
  const matradios = fixture.debugElement.query(By.css('.example-radio-button'));
  
    // matradio.triggerEventHandler('MatRadioChange',(event:MatRadioChange)=>{return event});
    expect(component.isboxset).toBeFalsy();
})
});
