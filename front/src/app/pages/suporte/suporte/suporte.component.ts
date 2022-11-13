import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.component.html',
  styleUrls: ['./suporte.component.scss']
})
export class SuporteComponent implements OnInit {

  user: User | null = null;
  
  constructor(private readonly router: Router,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUserValue();
  }

  navigateToJogadorCreate(): void {
    this.router.navigate(['suporte/create']);
  }

  checkRole(roles: string[]): boolean{
    return !!this.user && (roles.indexOf(this.user.role) > -1);
  }
}
