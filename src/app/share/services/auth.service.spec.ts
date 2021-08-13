import { TestBed } from '@angular/core/testing';
import { NgAuthService } from './auth.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('NgAuthService', () => {
  let service: NgAuthService;
  let authStub = {
    constructor: () => {console.log('constructor called')},
    SignIn: () => {console.log('login called')},
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ FormBuilder, 
        { provide: NgAuthService, useValue: authStub},
        ],
      imports: [ FormsModule, AngularFireModule, AngularFirestoreModule ],
    }).compileComponents();
    service = TestBed.inject(NgAuthService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
