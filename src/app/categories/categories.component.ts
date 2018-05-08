import { CategoryService } from './categories.service';
import { Component, OnInit } from '@angular/core';

import { Category, ContactSave, Function, Contact } from './../core/model';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FunctionService } from '../functions/function.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SaveCategoryComponent } from './save-category/save-category.component';
import { RemoveCategoryComponent } from './remove-category/remove-category.component';

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

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  changePaginator(event: PageEvent) {
    this.curentPage = event.pageIndex;
    this.currentPageSize = event.pageSize;
    this.getCategoriesPageable(this.curentPage, this.currentPageSize)
  }

  openDialog() {
    this.category.id = null;
    let dialogConfig = this.configDialog();

    const dialogRef = this.dialog.open(SaveCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != 'closed') {
          this.save(data);
          console.log(data);
          this.openDialog();
          return;
        }

      }
    );

  }

  configDialog(): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.category;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';

    return dialogConfig;
  }

  save(category: Category) {
    this.categoryService.save(category).subscribe(response => {
      this.getCategoriesPageable(this.curentPage, this.currentPageSize);
    },
      error => {

      })
  }

  edit(id: number) {
    let dialogConfig = this.configDialog();
    this.category.id = id;

    const dialogRef = this.dialog.open(SaveCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != 'closed') {
          this.update(data);
          this.openDialog();
          return;
        }

      }
    );

  }

  remove(category: Category) {
    let dialogConfig = this.configRemoveDialog(category);

    const dialogRef = this.dialog.open(RemoveCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.delete(data.id);
        }
      }
    );
  }

  configRemoveDialog(category: Category): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = category;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';

    return dialogConfig;
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe(response => {
      this.getCategoriesPageable(this.curentPage, this.currentPageSize);
    },
      error => {

      }
    )
  }

  update(category: Category) {
    this.categoryService.update(category).subscribe(response => {
      this.getCategoriesPageable(this.curentPage, this.currentPageSize);
    },
      error => {

      })
  }

}
