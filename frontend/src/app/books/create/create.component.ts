import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Data} from '../../shared/data';
import {BackendService} from '../../shared/backend.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  data: Data;

  constructor(
    private cs: BackendService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        fotoControl: [''],
        buch_idControl: [''],
        titelControl: ['', Validators.required],
        autorControl: ['', Validators.required],
        seitenControl: ['', Validators.required],
        kurzbeschreibungControl: ['', Validators.required],
        monatControl: ['', Validators.required],
        jahrControl: ['', Validators.required],
      }
    );
    this.data = { buch_id: 0, foto: '', titel: '', autor: '', seiten: 0, kurzbeschreibung: '', monat: '', jahr: 2021};
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.form.value);
    const values = this.form.value;
    this.data.buch_id = values.buch_idControl;
    this.data.titel = values.titelControl;
    this.data.autor = values.autorControl;
    this.data.seiten = values.seitenControl;
    this.data.kurzbeschreibung = values.kurzbeschreibungControl;
    this.data.monat = values.monatControl;
    this.data.jahr = values.jahrControl;
    console.log(this.data);
    this.cs.create(this.data);
    this.router.navigate(['/read']);
  }

  cancel(): void {
    this.router.navigate(['/read']);
  }
}
