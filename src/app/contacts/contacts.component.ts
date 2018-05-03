import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ContactsService, ContactFilter } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  conctactFilter = new ContactFilter();

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.search(this.conctactFilter, 0).subscribe(response => {
          console.log(response);
    },
      error => {
            console.log(error)
      }
    );
  }





  displayedColumns = ['position', 'function', 'actions'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Element {
  function: string;
  position: number;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, function: 'Hydrogen' },
  { position: 2, function: 'Helium' },
  { position: 3, function: 'Lithium' },
  { position: 4, function: 'Beryllium' },
  { position: 5, function: 'Boron' },
  { position: 6, function: 'Carbon' },
  { position: 7, function: 'Nitrogen' },
  { position: 8, function: 'Oxygen' },
  { position: 9, function: 'Fluorine' },
  { position: 10, function: 'Neon' },
  { position: 11, function: 'Sodium' },
  { position: 12, function: 'Magnesium' },
  { position: 13, function: 'Aluminum' },
  { position: 14, function: 'Silicon' },
  { position: 15, function: 'Phosphorus' },
  { position: 16, function: 'Sulfur' },
  { position: 17, function: 'Chlorine' },
  { position: 18, function: 'Argon' },
  { position: 19, function: 'Potassium' },
  { position: 20, function: 'Calcium' },
];

