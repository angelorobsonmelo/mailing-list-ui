import { FunctionService } from './../../functions/function.service';
import { CategoryService } from './../../categories/categories.service';
import { ContactsService } from './../contacts.service';
import { ContactSave, Category } from './../../core/model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-save-contact',
  templateUrl: './save-contact.component.html',
  styleUrls: ['./save-contact.component.css']
})
export class SaveContactComponent implements OnInit {

  contactSave = new ContactSave();
  categories: Category[];
  functions: Function[];
  genders = ['MALE', 'FEMALE'];

  constructor(private dialogRef: MatDialogRef<SaveContactComponent>,
    @Inject(MAT_DIALOG_DATA) data, private categoryService: CategoryService, private functionService: FunctionService) { }

  ngOnInit() {
    this.getCategories();
    this.getFunctions();
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
    this.dialogRef.close(this.contactSave);
    this.contactSave = new ContactSave();
  }

  close() {
    this.dialogRef.close('closed');
  }

}
