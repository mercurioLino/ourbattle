import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Organizacao } from 'src/app/models/organizacao.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizacaoService {

  baseApi = "/organizacao";

constructor(private readonly snackBar: MatSnackBar,
  private readonly http: HttpClient) { }

  create(organizacao: Organizacao): Observable<Organizacao> {
    return this.http.post<Organizacao>(environment.baseUrl + this.baseApi, organizacao);
  }

  showMessage(msg: string, IsError: boolean = false): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: IsError ? ['msg-error'] : ['msg-success']
    });

  }
}
