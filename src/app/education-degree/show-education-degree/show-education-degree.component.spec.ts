import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEducationDegreeComponent } from './show-education-degree.component';

describe('ShowEducationDegreeComponent', () => {
  let component: ShowEducationDegreeComponent;
  let fixture: ComponentFixture<ShowEducationDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEducationDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowEducationDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
