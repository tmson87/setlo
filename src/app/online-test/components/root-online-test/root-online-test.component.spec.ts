/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RootOnlineTestComponent } from './root-online-test.component';

describe('RootOnlineTestComponent', () => {
  let component: RootOnlineTestComponent;
  let fixture: ComponentFixture<RootOnlineTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootOnlineTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootOnlineTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});