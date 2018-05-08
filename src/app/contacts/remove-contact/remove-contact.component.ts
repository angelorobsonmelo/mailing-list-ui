import { Contact } from './../../core/model';
import { ContactsService } from './../contacts.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-remove-contact',
  templateUrl: './remove-contact.component.html',
  styleUrls: ['./remove-contact.component.css']
})
export class RemoveContactComponent implements OnInit {

  contact: Contact;

  constructor(private dialogRef: MatDialogRef<RemoveContactComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private contactService: ContactsService) {
    this.contact = data;
  }

  ngOnInit() {
  }

  remove() {
    this.dialogRef.close(this.contact.id);
  }

  close() {
    this.dialogRef.close();
  }

}
