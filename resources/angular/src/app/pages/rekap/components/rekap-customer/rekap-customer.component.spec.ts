import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapCustomerComponent } from './rekap-customer.component';

describe('RekapCustomerComponent', () => {
  let component: RekapCustomerComponent;
  let fixture: ComponentFixture<RekapCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekapCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
