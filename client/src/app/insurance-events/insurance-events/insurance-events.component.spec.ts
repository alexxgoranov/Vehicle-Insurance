import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceEventsComponent } from './insurance-events.component';

describe('InsuranceEventsComponent', () => {
  let component: InsuranceEventsComponent;
  let fixture: ComponentFixture<InsuranceEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
