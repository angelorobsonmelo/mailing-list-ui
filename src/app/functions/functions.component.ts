import { MatDialogConfig, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Function } from './../core/model';
import { FunctionService } from './functions.service';

import { PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { SaveFunctionComponent } from './save-function/save-function.component';
import { RemoveFunctionComponent } from './remove-function/remove-function.component';
import { SnacBarSuccessComponent } from '../core/snac-bar-success/snac-bar-success.component';



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

  constructor(private dialog: MatDialog, private functionService: FunctionService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getFunctionsPageable();
  }

  getFunctionsPageable(page = 0, pageSize = 50) {
    this.functionService.getCategoriesPageable(page, pageSize).subscribe(response => {
      this.length = response.data.totalElements;
      this.pageSize = response.data.size;
      this.pageSizeOptions = [5, 10, 15, 20, 25, 50];

      let functions = response.data.content;
      this.dataSource = new MatTableDataSource<Function>(functions);
    },
      error => {
        alert(error);
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  edit(id: number) {
    let dialogConfig = this.configDialog();
    this.function.id = id;

    const dialogRef = this.dialog.open(SaveFunctionComponent, dialogConfig);

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

  openDialog() {
    this.function.id = null;
    let dialogConfig = this.configDialog();

    const dialogRef = this.dialog.open(SaveFunctionComponent, dialogConfig);

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

  update(func: Function) {
    this.functionService.update(func).subscribe(response => {
      alert("Atualizado com sucesso!");
      this.getFunctionsPageable(this.curentPage, this.currentPageSize);
    },
      error => {
        alert(error);
      })
  }

  configDialog(): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.function;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';

    return dialogConfig;
  }

  save(func: Function) {
    this.functionService.save(func).subscribe(response => {
      alert("Salvo com sucesso!");
      this.getFunctionsPageable(this.curentPage, this.currentPageSize);
    },
      error => {
        alert(error);
      })
  }

  remove(fun: Function) {
    let dialogConfig = this.configRemoveDialog(fun);
    const dialogRef = this.dialog.open(RemoveFunctionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.delete(data.id);
        }
      }
    );
  }

  configRemoveDialog(func: Function): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = func;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';

    return dialogConfig;
  }

  delete(id: number) {
    this.functionService.delete(id).subscribe(response => {
      alert("Removido com sucesso!");
      this.getFunctionsPageable(this.curentPage, this.currentPageSize);
    },
      error => {
        alert(error);
      }
    )
  }

  changePaginator(event: PageEvent) {
    this.curentPage = event.pageIndex;
    this.currentPageSize = event.pageSize;
    this.getFunctionsPageable(this.curentPage, this.currentPageSize)
  }

}





