import { Component, QueryList, ViewChildren, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoaderService } from 'src/app/shared/service/loader.service';
import { NecessityStateService } from '../necessity-state.service';
import { INecessity } from 'src/app/model/necessity';
import { SortableTableHeaderDirective, SortEvent, Compare } from 'src/app/shared/directive/sortable-table-header.directive';

@Component({
  selector: 'app-necessity-overview',
  templateUrl: './necessity-overview.component.html',
  styleUrls: ['./necessity-overview.component.css'],
  host: { class: 'container' }
})
export class NecessityOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(SortableTableHeaderDirective) headers: QueryList<SortableTableHeaderDirective>;

  private _needle: string;
  private _filterCollection$: Observable<INecessity[]>;
  private queryParamSub: Subscription;

  public pageTitle: string;
  public isReady: boolean;
  public isLoading: boolean;
  public necessityCollection$: Observable<INecessity[]>;
  public get filterCollection$(): Observable<INecessity[]> {
    return this._filterCollection$;
  }
  public set filterCollection$(v: Observable<INecessity[]>) {
    this._filterCollection$ = v;
    this.isReady = true;
  }
  public get needle(): string {
    return this._needle;
  }
  public set needle(value: string) {
      this._needle = value;
      this.filter(this._needle);
  }

  constructor(private $acitvatedRoute: ActivatedRoute,
              private $router: Router,
              private necessityService: NecessityStateService,
              private loaderService: LoaderService) {
    this.pageTitle = 'Keukengerei Overzicht';
  }

  private filter(needle: string): void {
    const cleanNeedle = needle.toLocaleLowerCase();
    this.filterCollection$ = this.necessityCollection$.pipe(
        map(necessity => necessity.filter(n => {
            const nameMatch = n.Name.toLocaleLowerCase().indexOf(cleanNeedle) !== -1;
            return nameMatch;
        })));
  }

  onSort({column, direction}: SortEvent): void {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
        this.filter('');
    } else {
        this.filterCollection$ = this.filterCollection$.pipe(map(n => n.sort((a, b) => {
            const result = Compare(a[column], b[column]);
            return direction === 'asc' ? result : -result;
          })));
      }
  }
  ngOnInit(): void {
    this.isLoading = true;
  }

  ngAfterViewInit(): void {
    let needle = '';

    this.queryParamSub = this.$acitvatedRoute.queryParamMap.subscribe(m => { needle = m.get('filterBy'); });
    this.necessityCollection$ = this.necessityService.getNecessityCollection();
    this.filterCollection$ = this.necessityCollection$;

    if (needle != null) {
      this.needle = needle;
    }

    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.queryParamSub.unsubscribe();
  }
}
