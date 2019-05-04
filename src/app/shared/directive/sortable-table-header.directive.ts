import { Directive, Input, Output, EventEmitter } from '@angular/core';

const rotate: {[key: string]: SortDirection} = {
  'asc' : 'desc',
  'desc': '',
  '': 'asc'
};

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1: number, v2: number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableTableHeaderDirective {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate(): void {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

export interface SortEvent {
  column: string;
  direction: SortDirection;
}
