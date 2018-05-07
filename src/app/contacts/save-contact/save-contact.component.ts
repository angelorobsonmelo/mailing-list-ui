import { FunctionService } from './../../functions/function.service';
import { CategoryService } from './../../categories/categories.service';
import { ContactsService } from './../contacts.service';
import { ContactSave, Category, Contact } from './../../core/model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-save-contact',
  templateUrl: './save-contact.component.html',
  styleUrls: ['./save-contact.component.css']
})
export class SaveContactComponent implements OnInit {

  contact = new Contact();
  categories: Category[];
  functions: Function[];
  contactSaveId: number;
  genders = ['MALE', 'FEMALE'];

  constructor(private dialogRef: MatDialogRef<SaveContactComponent>,
    @Inject(MAT_DIALOG_DATA) data, private categoryService: CategoryService, private functionService: FunctionService,
    private contactService: ContactsService) {
    this.contactSaveId = data.id;
  }

  ngOnInit() {
    this.getCategories();
    this.getFunctions();

    if (this.contactSaveId) {
      this.contactService.findById(this.contactSaveId).subscribe(response => {
        this.contact = response.data;
      },
        error => {

        })

    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data.content;
    },
      error => {

      }
    )
  }

  getFunctions() {
    this.functionService.getFunctions().subscribe(response => {
      this.functions = response.data.content;
    },
      error => { }
    )
  }

  save() {
    let ContactSave = this.converterContactToContactSave(this.contact);

    this.dialogRef.close(ContactSave);
    this.contact = new Contact();
  }

  converterContactToContactSave(contact: Contact): ContactSave {
    console.log(this.contactSaveId);
    let contactSave = new ContactSave();
    contactSave.id = contact.category.id;
    contactSave.categoryId = contact.category.id;
    contactSave.functionsIds = contact.functions.map(item => item.id);
    contactSave.gender = contact.gender;
    contactSave.userNameInstagram = contact.userNameInstagram;

    return contactSave;
  }

  close() {
    this.dialogRef.close('closed');
  }

}
