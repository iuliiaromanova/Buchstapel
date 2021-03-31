import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import { Data } from '../../../shared/data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() data: Data;
  @Output() updateEvent = new EventEmitter<Data>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {
    this.form = this.fb.group(
      {
        fotoControl: [''],
        buch_idControl: ['', Validators.required],
        titelControl: ['', Validators.required],
        autorControl: ['', Validators.required],
        seitenControl: ['', Validators.required],
        kurzbeschreibungControl: ['', Validators.required],
        monatControl: ['', Validators.required],
        jahrControl: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.form.patchValue({
      buch_idControl: this.data?.buch_id,
      titelControl: this.data?.titel,
      autorControl: this.data?.autor,
      seitenControl: this.data?.seiten,
      kurzbeschreibungControl: this.data?.kurzbeschreibung,
      monatControl: this.data?.monat,
      jahrControl: this.data?.jahr,
    });
  }

   onSubmit(): void {
    const values = this.form.value;
    this.data.buch_id = values.buch_idControl;
    this.data.titel = values.titelControl;
    this.data.autor = values.autorControl;
    this.data.seiten = values.seitenControl;
    this.data.kurzbeschreibung = values.kurzbeschreibungControl;
    this.data.monat = values.monatControl;
    this.data.jahr = values.jahrControl;
    this.updateEvent.emit(this.data);
  }

  cancel(): void {
    this.location.back();
  }
}
