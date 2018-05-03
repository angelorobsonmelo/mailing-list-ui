import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContactsService, ContactFilter } from './contacts.service';
import { Contact } from '../core/model';
import { PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  // MatPaginator Inputs

  length: any;
  pageSize: any;
  pageSizeOptions: any[];

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

  changePaginator(event: PageEvent) {
    this.getContacts(event.pageIndex, event.pageSize)
  }

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  toppings = new FormControl();

  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
  displayedColumns = ['username Instagram', 'category', 'gender', 'functions', 'inserted by', 'actions'];

}

