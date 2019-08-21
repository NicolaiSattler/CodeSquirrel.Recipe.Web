import { Component, OnInit, OnDestroy, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IKeyValue } from '../../model/keyvalue';
import { IProduct } from '../../model/product';
import { ProductStateService } from '../product-state.service';
import { LoaderService } from '../../shared/service/loader.service';
import { SortableTableHeaderDirective, SortEvent, Compare } from 'src/app/shared/directive/sortable-table-header.directive';

@Component({
    selector: 'app-product-overview',
    templateUrl: './product-overview.component.html',
    styleUrls: ['./product-overview.component.css'],
    host: { class: 'container' }
})
export class ProductOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChildren(SortableTableHeaderDirective) headers: QueryList<SortableTableHeaderDirective>;

    private productTypeSub: Subscription;
    private queryParamSub: Subscription;

    private _filterProductCollection$: Observable<IProduct[]>;
    private _needle: string;
    private _isLoading: boolean;

    public pageTitle: string;
    public stateMessage: string;
    public selectAllChecked: boolean;
    public productTypes: IKeyValue[];
    public productCollection$: Observable<IProduct[]>;
    public get isLoading(): boolean {
        return this._isLoading;
    }
    public set isLoading(v: boolean) {
        this.setLoader(v);
        this._isLoading = v;
    }
    public get filterProductCollection$(): Observable<IProduct[]> {
        return this._filterProductCollection$;
    }
    public set filterProductCollection$(v: Observable<IProduct[]>) {
        this._filterProductCollection$ = v;
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

    private setLoader(isloading: boolean): void {
        setTimeout(() => {
            this.loaderService.show(isloading);
        });
    }
    private filter(needle: string): void {
        const cleanNeedle = needle.toLocaleLowerCase();
        this.filterProductCollection$ = this.productCollection$.pipe(
            map(products => products.filter(p => {
                const nameMatch = p.Name.toLocaleLowerCase().indexOf(cleanNeedle) !== -1;
                const typeString =  this.getTypeFlag(p.Type.toString());
                const typeMatch = typeString ? typeString.toLocaleLowerCase().indexOf(cleanNeedle) !== -1 : false;
                return nameMatch || typeMatch;
            })));
    }

    public getTypeFlag(key: string): string {
        const item = this.productTypes.find(kv => kv.Key === +key);
        return item.Value;
    }

    onCreateProduct(): void {
        this.$router.navigate(['/products', 0, { isnew: true } ], { queryParams : { filterBy: this.needle } });
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
          this.filterProductCollection$ = this.filterProductCollection$.pipe(map(products => products.sort((a, b) => {
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
        this.queryParamSub = this.$activatedRoute.queryParamMap.subscribe(m => { needle = m.get('filterBy'); });
        this.productTypeSub = this.productService.getProductTypes$()
                                                 .subscribe((result) => {
                this.productTypes = result;
                this.productCollection$ = this.productService.getProductCollection$();
                this.filterProductCollection$ = this.productCollection$;
                if (needle !== null) {
                    this.needle = needle;
                }

                this.isLoading = false;
            },
            (error) => {
                this.stateMessage = error;
                this.isLoading = false;
            }
        );
    }

    ngOnDestroy(): void {
        this.productTypeSub.unsubscribe();
        this.queryParamSub.unsubscribe();
    }
}
