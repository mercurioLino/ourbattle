import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  constructor(private readonly router:Router) { }

  ngOnInit(): void {
  }

  navigateToJogoCreate(): void {
    this.router.navigate(['jogo/create']);
  }
}

