import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { NgAuthService } from '../../share/services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  let authStub = {
    constructor: () => {console.log('constructor called')},
    SignIn: () => {console.log('login called')},
  }

beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.configureTestingModule({
      providers: [ FormBuilder, 
        { provide: NgAuthService, useValue: authStub},
        ],
      imports: [ ReactiveFormsModule, AngularFireModule, AngularFirestoreModule ],
    }).compileComponents();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}));
});
