import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableHeader } from './sortable-header';

describe('NgbdSortableHeaderComponent', () => {
  let component: SortableHeader;
  let fixture: ComponentFixture<SortableHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortableHeader ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortableHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});