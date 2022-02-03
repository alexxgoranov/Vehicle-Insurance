import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCardLoaderComponent } from './app-card-loader.component';

describe('AppCardLoaderComponent', () => {
  let component: AppCardLoaderComponent;
  let fixture: ComponentFixture<AppCardLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCardLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
