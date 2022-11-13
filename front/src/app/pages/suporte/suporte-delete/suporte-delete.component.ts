import { Suporte } from './../../../models/suporte.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: 'app-suporte-delete',
  templateUrl: './suporte-delete.component.html',
  styleUrls: ['./suporte-delete.component.scss']
})
export class SuporteDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Suporte) {}

  ngOnInit(): void {}
}
