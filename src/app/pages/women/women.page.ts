import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { ProductApi } from 'src/app/core/services/apis/product.api';

import { FilterState } from 'src/app/core/services/states/filter.state';
import { ProductState } from 'src/app/core/services/states/product.state';
import { CategoryState } from 'src/app/core/services/states/category.state';

import { Category } from 'src/app/shared/models/category.interface';
import { Filter } from 'src/app/shared/models/filter.model';
import { Pagination } from 'src/app/shared/models/pagination/pagination.model';

@Component({
  selector: 'women',
  templateUrl: './women.page.html',
  styleUrls: ['./women.page.scss']
})
export class WomenPage implements OnInit, OnDestroy {

  private subs = new SubSink();

  curFilter: Filter;
  pagination: Pagination;
  sortDir = true;
  sortField = 'popularity';

  constructor(
    private productApi: ProductApi,
    private productState: ProductState,
    private filterState: FilterState,
    private categoryState: CategoryState,
  ) {}

  ngOnInit() {
    this.getFilterData();
  }

  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.subs.sink = this.categoryState.getCategories().pipe(
      map((categories: Category[]) => categories.find(item => item.category_name.toLowerCase() === 'women'))
    ).subscribe((category: Category) => {
      this.updateProductsByCategory(category);
    });
  }

  getFilterData() {
    this.subs.sink = this.filterState.getCurrentFilter().subscribe(res => {
      this.curFilter = res;
    });
    this.subs.sink = this.filterState.getPagination().subscribe(pagination => {
      this.pagination = pagination;
    });
    this.subs.sink = this.filterState.getSortDir().subscribe(res => {
      this.sortDir = res;
    });
    this.subs.sink = this.filterState.getSortField().subscribe(res => {
      this.sortField = res;
    });
  }

  updateProductsByCategory(category) {
    this.productState.setProducts(null);
    this.categoryState.setCategory(category);
    this.filterState.isUpdating.next(true);
    this.subs.sink = this.productApi.getProductsByCategory(category.category_uuid, this.sortDir, this.pagination.meta.current_page,
      this.curFilter, this.sortField).subscribe(res => {
      this.productState.setProducts(res.data);
      this.filterState.setFilter(new Filter().deserialize(res.filters));
      this.filterState.setPagination(new Pagination().deserialize({ links: res.links, meta: res.meta }));
      this.filterState.setCurrentFilter(new Filter());
      this.filterState.setSortDir(true);
      this.filterState.isUpdating.next(false);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
