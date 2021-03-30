import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { Data } from '../../shared/data';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
    books: Data[];


  constructor(private cs: BackendService) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
        this.cs.getAll().subscribe(
      (response: Data[]) => {
        console.log(response);
        return this.books = response;  },
      error => console.log(error)
    );
  }

}
