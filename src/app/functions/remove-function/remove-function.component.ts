import { FunctionService } from './../functions.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Function } from './../../core/model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-remove-function',
  templateUrl: './remove-function.component.html',
  styleUrls: ['./remove-function.component.css']
})
export class RemoveFunctionComponent implements OnInit {

  function: Function;

  constructor(private dialogRef: MatDialogRef<RemoveFunctionComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private functionService: FunctionService) {
    this.function = data;
  }

  ngOnInit() {
  }

  remove() {
    this.dialogRef.close(this.function.id);
  }

  close() {
    this.dialogRef.close();
  }
}
