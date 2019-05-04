import { Component, OnInit, OnDestroy, AfterContentInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IKeyValue } from '../../model/keyvalue';
import { IProduct } from '../../model/product';
import { ProductStateService } from '../product-state.service';
import { LoaderService } from '../../shared/service/loader.service';
import { SortableTableHeaderDirective, SortEvent } from 'src/app/shared/directive/sortable-table-header.directive';

export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
    selector: 'app-product-overview',
    templateUrl: './product-overview.component.html',
    styleUrls: ['./product-overview.component.css'],
    host: { class: 'container' }
})
export class ProductOverviewComponent implements OnInit, AfterContentInit, OnDestroy {

    @ViewChildren(SortableTableHeaderDirective) headers: QueryList<SortableTableHeaderDirective>;

    private productTypeSub: Subscription;
    private queryParamSub: Subscription;

    private _filterProductCollection$: Observable<IProduct[]>;
    private _needle: string;

    public pageTitle: string;
    public stateMessage: string;
    public selectAllChecked: boolean;
    public isReady: boolean;
    public productTypes: IKeyValue[];
    public productCollection$: Observable<IProduct[]>;
    public get filterProductCollection$(): Observable<IProduct[]> {
        return this._filterProductCollection$;
    }
    public set filterProductCollection$(v: Observable<IProduct[]>) {
        this._filterProductCollection$ = v;
        this.isReady = true;
    }
    public get needle(): string {
        return this._needle;
    }
    public set needle(value: string) {
        this._needle = value;
        this.filter(this._needle);
    }

    constructor(private $activatedRoute: ActivatedRoute,
                private $router: Router,
                private productService: ProductStateService,
                private loaderService: LoaderService) {
        this.pageTitle = 'Product Overzicht';
    }

    private filter(needle: string): void {
        const cleanNeedle = needle.toLocaleLowerCase();
        this.filterProductCollection$ = this.productCollection$.pipe(
            map(products => products.filter(p => p.Name.toLocaleLowerCase().indexOf(cleanNeedle) !== -1)));
    }

    public getTypeFlag(key: string): string {
        const item = this.productTypes.find(kv => kv.Key === +key);
        return item.Value;
    }
    public Add(): void {
        this.$router.navigate(['/products', 0, { isnew: true } ], { queryParams : { filterBy: this.needle } });
    }
    public Remove(): void {

    }
    public SelectRow(index: any): void {
        console.log('rowindex:' + index);
    }

    onSort({column, direction}: SortEvent): void {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });

      if (direction === '') {   
          this.filter(this._needle);
      } else {
          this.filterProductCollection$ = this.filterProductCollection$.pipe(map(products => products.sort((a, b) => {
              const result = compare(a[column], b[column]);
              return direction === 'asc' ? result : -result;
            })));
        }
    }

    ngOnInit(): void {
        this.loaderService.show(true);

        let needle = '';

        this.queryParamSub = this.$activatedRoute.queryParamMap.subscribe(map => {
            needle = map.get('filterBy');
        });


        this.productTypeSub = this.productService.getProductTypes()
                                                 .subscribe((result) => {
                this.productTypes = result;
                this.productCollection$ = this.productService.getProductCollection();
                this.filterProductCollection$ = this.productCollection$;
                if (needle !== null) {
                    this.needle = needle;
                }
                this.loaderService.show(false);
            },
            (error) => {
                this.stateMessage = error;
                this.loaderService.show(false);
            });
    }

    ngAfterContentInit(): void {

    }

    ngOnDestroy(): void {
        this.productTypeSub.unsubscribe();
        this.queryParamSub.unsubscribe();
    }
}
