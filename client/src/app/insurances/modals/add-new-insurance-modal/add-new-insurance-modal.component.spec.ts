import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewInsuranceModalComponent } from './add-new-insurance-modal.component';

describe('AddNewInsuranceModalComponent', () => {
  let component: AddNewInsuranceModalComponent;
  let fixture: ComponentFixture<AddNewInsuranceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewInsuranceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewInsuranceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
