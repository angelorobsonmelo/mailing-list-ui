import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContactsService, ContactFilter } from './contacts.service';
import { Contact } from '../core/model';
import {PageEvent} from '@angular/material';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
 // MatPaginator Inputs

 length:any;
 pageSize:any;
 pageSizeOptions:any [];

  conctactFilter = new ContactFilter();

  constructor(private contactsService: ContactsService) { }

  dataSource: any;

  ngOnInit() {
   this.getContacts();
  }

  getContacts(page = 0, pageSize = 25) {
    this.contactsService.search(this.conctactFilter, page, pageSize).subscribe(response => {
      this.length = response.data.totalElements;
      this.pageSize = response.data.size;
      this.pageSizeOptions = [5, 10, 15, 20, 25];

      console.log(response.data);

      let contacts = response.data.content;
      this.dataSource = new MatTableDataSource<Contact>(contacts);
    },
      error => {
        console.log(error)
      }
    );
  }

  aomudar(event: PageEvent) {
      console.log(event);
      this.getContacts(event.pageIndex, event.pageSize)
  }

  displayedColumns = ['username Instagram', 'category', 'gender', 'functions', 'inserted by', 'actions'];

}

