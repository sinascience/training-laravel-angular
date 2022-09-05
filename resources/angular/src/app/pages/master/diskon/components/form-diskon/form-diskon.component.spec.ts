import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiskonComponent } from './form-diskon.component';

describe('FormDiskonComponent', () => {
  let component: FormDiskonComponent;
  let fixture: ComponentFixture<FormDiskonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDiskonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDiskonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
