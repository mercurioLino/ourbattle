import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Funcionario } from "src/app/models/funcionario.model";

@Component({
  selector: "app-funcionario-delete",
  templateUrl: "./funcionario-delete.component.html",
  styleUrls: ["./funcionario-delete.component.scss"],
})
export class FuncionarioDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Funcionario) {}

  ngOnInit(): void {}
}
