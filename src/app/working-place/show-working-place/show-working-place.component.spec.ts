import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWorkingPlaceComponent } from './show-working-place.component';

describe('ShowWorkingPlaceComponent', () => {
  let component: ShowWorkingPlaceComponent;
  let fixture: ComponentFixture<ShowWorkingPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWorkingPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowWorkingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
