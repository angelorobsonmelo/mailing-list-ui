import { SaveContactComponent } from './save-contact/save-contact.component';
import { Category } from './../core/model';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContactsService, ContactFilter } from './contacts.service';
import { Contact, Function } from '../core/model';
import { PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FunctionService } from '../functions/function.service';
import { CategoryService } from '../categories/categories.service';
import { MatDialog, MatDialogConfig } from "@angular/material";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  functions: Function[];
  categories: Category[];
  conctactFilter = new ContactFilter();
  dataSource: any;

  constructor(private contactsService: ContactsService, private functionService: FunctionService, private categoryService: CategoryService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getContacts();
    this.getFunctions();
    this.getCategories();
  }

  getContacts(page = 0, pageSize = 25) {
    this.contactsService.search(this.conctactFilter, page, pageSize).subscribe(response => {
      this.length = response.data.totalElements;
      this.pageSize = response.data.size;
      this.pageSizeOptions = [5, 10, 15, 20, 25];

      let contacts = response.data.content;
      this.dataSource = new MatTableDataSource<Contact>(contacts);
    },
      error => {
        console.log(error)
      }
    );
  }

  getFunctions() {
    this.functionService.getFunctions().subscribe(response => {
      this.functions = response.data.content;
      console.log(this.functions);
    },
      error => { }
    )
  }

  getCategories() {
    this.categoryService.getFunctions().subscribe(response => {
      this.categories = response.data.content;
    },
      error => {

      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(SaveContactComponent, {
      width: 'auto',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changePaginator(event: PageEvent) {
    this.getContacts(event.pageIndex, event.pageSize)
  }

  genders = ['MALE', 'FEMALE'];

  displayedColumns = ['username Instagram', 'category', 'gender', 'functions', 'inserted by', 'actions'];

}

