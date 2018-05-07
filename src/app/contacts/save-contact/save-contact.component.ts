import { FunctionService } from './../../functions/function.service';
import { CategoryService } from './../../categories/categories.service';
import { ContactsService } from './../contacts.service';
import { ContactSave, Category, Contact, Function } from './../../core/model';
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
    this.findById(this.contactSaveId);
  }

  findById(id: number) {
    if (id) {
      this.contactService.findById(id).subscribe(response => {
        this.contact = response.data;
        console.log(this.contact);
      },
        error => {

        })
    }
  }

  compareFn(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
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
    this.contactSaveId = null;
  }

  converterContactToContactSave(contact: Contact): ContactSave {
    let contactSave = new ContactSave();
    contactSave.id = contact.id;
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
