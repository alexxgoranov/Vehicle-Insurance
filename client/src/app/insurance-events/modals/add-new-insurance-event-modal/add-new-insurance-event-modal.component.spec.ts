import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewInsuranceEventModalComponent } from './add-new-insurance-event-modal.component';

describe('AddNewInsuranceEventModalComponent', () => {
  let component: AddNewInsuranceEventModalComponent;
  let fixture: ComponentFixture<AddNewInsuranceEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewInsuranceEventModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewInsuranceEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
