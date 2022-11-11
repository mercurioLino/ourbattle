import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.scss']
})
export class JogadorComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  navigateToJogadorCreate(): void {
    this.router.navigate(['jogador/create']);
  }
}
