import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterestComponent } from './add-interest.component';

describe('AddInterestComponent', () => {
  let component: AddInterestComponent;
  let fixture: ComponentFixture<AddInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});