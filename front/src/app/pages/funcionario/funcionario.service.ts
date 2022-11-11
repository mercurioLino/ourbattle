import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  baseApi = "/funcionario";

  constructor(private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient) { }
  
    create(funcionario: Funcionario): Observable<Funcionario> {
      return this.http.post<Funcionario>(environment.baseUrl + this.baseApi, funcionario);
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
  