import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationDegreeComponent } from './education-degree.component';

describe('EducationDegreeComponent', () => {
  let component: EducationDegreeComponent;
  let fixture: ComponentFixture<EducationDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
