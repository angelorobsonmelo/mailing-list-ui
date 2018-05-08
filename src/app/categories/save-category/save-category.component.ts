import { CategoryService } from './../categories.service';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Category } from './../../core/model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-save-category',
  templateUrl: './save-category.component.html',
  styleUrls: ['./save-category.component.css']
})
export class SaveCategoryComponent implements OnInit {

  category = new Category();
  categoryId: number;

  constructor(private dialogRef: MatDialogRef<SaveCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) data, private categoryService: CategoryService) {
      this.categoryId = data.id;
  }

  ngOnInit() {
    this.findById(this.categoryId);
  }

  findById(id: number) {
    if (id) {
      this.categoryService.findById(id).subscribe(response => {
        this.category = response.data;
      },
        error => {

        })
    }
  }

  save() {
    let category = this.category;

    this.dialogRef.close(category);
    this.category = new Category();
    this.categoryId = null;
  }

  close() {
    this.dialogRef.close('closed');
  }

}
