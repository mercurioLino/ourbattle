import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }


  navigateToFuncionarioCreate(): void {
    this.router.navigate(['funcionario/create']);
    }
}
