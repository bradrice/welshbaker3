import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './authguard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgAuthService } from './auth.service';

describe('AuthguardService', () => {

  let authStub = {
    constructor: () => {console.log('constructor called')},
    SignIn: () => {console.log('login called')},
  }

  let service: AuthGuardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      RouterTestingModule,
      ],
      providers: [
        { provide: NgAuthService, useValue: authStub},
      ]
    })
    service = TestBed.inject(AuthGuardService)
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
