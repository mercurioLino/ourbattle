import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router'
@Component({
  selector: 'app-organizacoes',
  templateUrl: './organizacoes.component.html',
  styleUrls: ['./organizacoes.component.scss']
})
export class OrganizacoesComponent implements OnInit {

  constructor(private readonly router:Router) { }

  ngOnInit() {
  }

  navigateToOrganizacaoCreate(): void {
    this.router.navigate(['organizacoes/create']);
    }
}
