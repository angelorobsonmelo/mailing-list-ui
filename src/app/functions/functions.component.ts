import { MatDialog } from '@angular/material';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Function } from './../core/model';
import { FunctionService } from './function.service';

import { PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  curentPage: number;
  currentPageSize: number;
  dataSource: any;
  displayedColumns = ['function', 'actions'];
  function = new Function();

  constructor(private dialog: MatDialog, private functionService: FunctionService) { }

  ngOnInit() {
    this.getCategoriesPageable();
  }

  getCategoriesPageable(page = 0, pageSize = 50) {
    this.functionService.getCategoriesPageable(page, pageSize).subscribe(response => {
      this.length = response.data.totalElements;
      this.pageSize = response.data.size;
      this.pageSizeOptions = [5, 10, 15, 20, 25, 50];

      let functions = response.data.content;
      this.dataSource = new MatTableDataSource<Function>(functions);
    },
      error => {

      })
  }

}





