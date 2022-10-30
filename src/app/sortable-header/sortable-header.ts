import { Directive, EventEmitter, Input, Output } from '@angular/core';

interface Candidate {
  firstName: string;
  lastName: string;
  dateOfApplication: string;
  workingPlace: string;
  profession: string;
  education: string;
  employment: string;
  dateOfInterview: string;
  evaluation: string;
  selectEmployment: string;
  dateOfEmployment: string;
}

interface Interview {
  dateOfInterview: string;
  comment: string;
  interest: string;
  evaluation: string;
  selectEmployment: string;
  dateOfEmployment: string;
}

interface User {
  userName: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export type SortColumn = keyof Candidate | keyof Interview | keyof User | 'name' | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = 'asc';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}