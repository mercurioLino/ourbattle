import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Perfil } from "src/app/models/perfil.model";

@Component({
  selector: "app-perfil-delete",
  templateUrl: "./perfil-delete.component.html",
  styleUrls: ["./perfil-delete.component.scss"],
})
export class PerfilDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Perfil) {}

  ngOnInit(): void {}
}
