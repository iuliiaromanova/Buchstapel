import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';
import { Data } from '../../shared/data';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';



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
    closeResult = '';
    form: FormGroup;


  constructor(
    private cs: BackendService,
    private route: ActivatedRoute,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    // Konfiguration des modalen Dialogs
    config.backdrop = 'static';   // schliesst nicht, wenn man in das Fenster dahinter klickt
    config.keyboard = false;      // Modaler Dialog kann nicht durch ESC beendet werden
    // Formular fuer delete
    this.form = this.fb.group(
      {
        buch_idControl: ['', Validators.required],
      }
    );
  }

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

  update(data: Data): void {
    this.book = data;
    this.cs.update(this.book.buch_id, this.book);
    this.router.navigateByUrl('/read');
  }

  deleteOne(id: number): void {
    this.cs.deleteOne(id);
    window.location.reload();
  }

  open(content, id: number): void {
    this.readOne(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      if (result === 'delete')
      {
        this.deleteOne(this.book?.buch_id);
      }
    });
  }

}
