import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyusersComponent } from './companyusers.component';

describe('CompanyusersComponent', () => {
  let component: CompanyusersComponent;
  let fixture: ComponentFixture<CompanyusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
