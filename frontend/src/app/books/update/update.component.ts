import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Data} from "../../shared/data";
import {BackendService} from "../../shared/backend.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  selectedId: number;
  book: Data;
  error: HttpErrorResponse;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: BackendService,){ }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    this.readOne(this.selectedId);
  }

    readOne(id: number): void {
    this.cs.getDataById(id).subscribe(
      (response: Data) => this.book = response,
      error => this.error = error

    );
  }

    update(data: Data): void {
    this.book = data;
    this.cs.update(this.book.buch_id, this.book);
    this.router.navigateByUrl('/read');
  }

}

