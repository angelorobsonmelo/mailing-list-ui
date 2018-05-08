import { CategoryService } from './categories.service';
import { Component, OnInit } from '@angular/core';

import { Category, ContactSave, Function, Contact } from './../core/model';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FunctionService } from '../functions/function.service';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  curentPage: number;
  currentPageSize: number;
  dataSource: any;
  displayedColumns = ['category', 'actions'];
  category = new Category();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoriesPageable();
  }

  getCategoriesPageable(page = 0, pageSize = 50) {
    this.categoryService.getCategoriesPageable(page, pageSize).subscribe(response => {
      this.length = response.data.totalElements;
      this.pageSize = response.data.size;
      this.pageSizeOptions = [5, 10, 15, 20, 25, 50];

      let categories = response.data.content;
      this.dataSource = new MatTableDataSource<Category>(categories);
    },
      error => {

      })
  }

  changePaginator(event: PageEvent) {
    this.curentPage = event.pageIndex;
    this.currentPageSize = event.pageSize;
    this.getCategoriesPageable(this.curentPage, this.currentPageSize)
  }

}
