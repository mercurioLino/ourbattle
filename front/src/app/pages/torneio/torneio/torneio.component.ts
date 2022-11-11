import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-torneios',
  templateUrl: './torneio.component.html',
  styleUrls: ['./torneio.component.scss']
})
export class TorneiosComponent implements OnInit {

  constructor(private readonly router:Router) { }

  ngOnInit() {

  }
  navigateToTorneioCreate(): void {
    this.router.navigate(['torneio/create']);
  }
}
