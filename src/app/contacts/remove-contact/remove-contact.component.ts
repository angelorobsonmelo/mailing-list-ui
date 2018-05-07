import { ContactsService } from './../contacts.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-remove-contact',
  templateUrl: './remove-contact.component.html',
  styleUrls: ['./remove-contact.component.css']
})
export class RemoveContactComponent implements OnInit {

  contactId: number;

  constructor(private dialogRef: MatDialogRef<RemoveContactComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private contactService: ContactsService) {
    this.contactId = data;
  }

  ngOnInit() {
  }

  remove() {
    this.dialogRef.close(this.contactId);
  }

  close() {
    this.dialogRef.close();
  }

}
