// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {Router} from "@angular/router";

import {
    BoxfillComponent,
    LoginComponent,
    AdminComponent,
} from "./app/routes"


declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

describe('Router: App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BoxfillComponent,
        AdminComponent,
        LoginComponent
      ],
      imports: [
      RouterTestingModule,
      Router
      ]
    });
  });
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
