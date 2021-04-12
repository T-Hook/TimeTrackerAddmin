import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectusersComponent } from './projectusers.component';

describe('ProjectusersComponent', () => {
  let component: ProjectusersComponent;
  let fixture: ComponentFixture<ProjectusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
