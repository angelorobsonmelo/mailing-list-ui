import { CategoryService } from './../categories.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Category } from './../../core/model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.css']
})
export class RemoveCategoryComponent implements OnInit {

  category: Category;

  constructor(private dialogRef: MatDialogRef<RemoveCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private categoryService: CategoryService) {
    this.category = data;
  }

  ngOnInit() {
  }

  remove() {
    this.dialogRef.close(this.category.id);
  }

  close() {
    this.dialogRef.close();
  }

}
