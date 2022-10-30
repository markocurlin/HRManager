import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingPlaceComponent } from './working-place.component';

describe('WorkingPlaceComponent', () => {
  let component: WorkingPlaceComponent;
  let fixture: ComponentFixture<WorkingPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
