import { SaveContactComponent } from './save-contact/save-contact.component';
import { Category, ContactSave, Function, Contact } from './../core/model';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContactsService, ContactFilter } from './contacts.service';
import { PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FunctionService } from '../functions/function.service';
import { CategoryService } from '../categories/categories.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { RemoveContactComponent } from './remove-contact/remove-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  curentPage: number;
  currentPageSize: number;
  functions: Function[];
  categories: Category[];
  conctactFilter = new ContactFilter();
  dataSource: any;
  contact = new ContactSave();
  genders = ['MALE', 'FEMALE'];
  displayedColumns = ['username Instagram', 'category', 'gender', 'functions', 'inserted by', 'actions'];

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
    },
      error => { }
    )
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data.content;
    },
      error => {
        console.log(error);
      }
    )
  }

  openDialog() {
    this.contact.id = null;
    let dialogConfig = this.configDialog();

    const dialogRef = this.dialog.open(SaveContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != 'closed') {
          this.save(data);
          this.openDialog();
          return;
        }

      }
    );

  }

  edit(id: number) {
    let dialogConfig = this.configDialog();
    this.contact.id = id;

    const dialogRef = this.dialog.open(SaveContactComponent, dialogConfig);

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

  remove(contact: Contact) {
    let dialogConfig = this.configRemoveDialog(contact);

    const dialogRef = this.dialog.open(RemoveContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.delete(data.id);
        }
      }
    );
  }

  configRemoveDialog(contact: Contact): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = contact;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';

    return dialogConfig;
  }

  delete(id: number) {
    this.contactsService.delete(id).subscribe(response => {
      console.log('removido com sucesso');
      this.getContacts(this.curentPage, this.currentPageSize);
    },
      error => {

      }
    )
  }

  configDialog(): MatDialogConfig {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.contact;
    dialogConfig.height = 'auto';
    dialogConfig.width = '600px';

    return dialogConfig;
  }

  save(contactSave: ContactSave) {
    this.contactsService.save(contactSave).subscribe(response => {
      this.getContacts(this.curentPage, this.currentPageSize);
      console.log("salvou");
    },
      error => {

      })
  }

  update(contactSave: ContactSave) {
    this.contactsService.update(contactSave).subscribe(response => {
      this.getContacts(this.curentPage, this.currentPageSize);
      console.log("salvou");
    },
      error => {

      })
  }

  changePaginator(event: PageEvent) {
    this.curentPage = event.pageIndex;
    this.currentPageSize = event.pageSize;
    this.getContacts(this.curentPage, this.currentPageSize)
  }

}

