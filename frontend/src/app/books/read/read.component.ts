import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { Data } from '../../shared/data';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
    books: Data[];
    book: Data;
    selectedId: number;
    error: HttpErrorResponse;

  constructor(private cs: BackendService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedId === 0) {
      this.readAll();
    }
    else {
      console.log('id = ' + this.selectedId);
      this.readOne(this.selectedId);
    }
  }

    trackByData(index: number, data: Data): number { return data.buch_id; }

    readAll(): void {
        this.cs.getAll().subscribe(
      (response: Data[]) => {
        console.log(response);
        return this.books = response;  },
      error => console.log(error)
    );
  }

  readOne(id: number): void {
    this.cs.getDataById(id).subscribe(
      (response: Data) => this.book = response,
      error => this.error = error

    );
  }

}
