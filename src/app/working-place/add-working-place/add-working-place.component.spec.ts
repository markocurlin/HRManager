import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkingPlaceComponent } from './add-working-place.component';

describe('AddWorkingPlaceComponent', () => {
  let component: AddWorkingPlaceComponent;
  let fixture: ComponentFixture<AddWorkingPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkingPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
