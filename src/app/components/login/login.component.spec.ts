import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { NgAuthService } from '../../share/services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('AdminComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authStub = {
    constructor: () => {console.log('constructor called')},
    SignIn: () => {console.log('login called')},
  }

beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [ FormBuilder, 
        { provide: NgAuthService, useValue: authStub},
        ],
      imports: [ ReactiveFormsModule, AngularFireModule, AngularFirestoreModule ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}));
});
