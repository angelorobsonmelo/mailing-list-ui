import { Function } from './../../core/model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { FunctionService } from './../functions.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-save-function',
  templateUrl: './save-function.component.html',
  styleUrls: ['./save-function.component.css']
})
export class SaveFunctionComponent implements OnInit {

  function = new Function();
  functionId: number;

  constructor(private dialogRef: MatDialogRef<SaveFunctionComponent>,
    @Inject(MAT_DIALOG_DATA) data, private functionService: FunctionService) {
      this.functionId = data.id;
  }

  ngOnInit() {
    this.findById(this.functionId);
  }

  findById(id: number) {
    if (id) {
      this.functionService.findById(id).subscribe(response => {
        this.function = response.data;
      },
        error => {

        })
    }
  }

  save() {
    let func = this.function;

    this.dialogRef.close(func);
    this.function = new Function();
    this.functionId = null;
  }

  close() {
    this.dialogRef.close('closed');
  }

}
