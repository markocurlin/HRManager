import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducationDegreeComponent } from './add-education-degree.component';

describe('AddEducationDegreeComponent', () => {
  let component: AddEducationDegreeComponent;
  let fixture: ComponentFixture<AddEducationDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEducationDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEducationDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
