import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  message: any;
  convertedJson : String | any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fileUpload(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      console.log(event);
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, {type:'binary'});
      workBook.SheetNames.forEach(sheet =>{
        const data = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
        console.log(data);
        this.convertedJson = JSON.stringify(data, undefined, 4);
      })
      
    }
  }
}
