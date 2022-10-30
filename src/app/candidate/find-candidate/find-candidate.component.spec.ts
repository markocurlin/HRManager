import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCandidateComponent } from './find-candidate.component';

describe('FindCandidateComponent', () => {
  let component: FindCandidateComponent;
  let fixture: ComponentFixture<FindCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});