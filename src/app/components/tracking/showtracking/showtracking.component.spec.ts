import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtrackingComponent } from './showtracking.component';

describe('ShowtrackingComponent', () => {
  let component: ShowtrackingComponent;
  let fixture: ComponentFixture<ShowtrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowtrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
