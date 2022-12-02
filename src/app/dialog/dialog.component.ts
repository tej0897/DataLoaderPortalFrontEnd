import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      drugID: ['', Validators.required],
      drugName: ['', Validators.required],
    });

    console.log(this.editData);
  }

  patientForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
    ) {}

  addProduct() {
      
  }
}
