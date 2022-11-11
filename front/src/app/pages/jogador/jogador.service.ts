import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { Jogador } from 'src/app/models/jogador.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable(
  {providedIn: 'root'}
)
export class JogadorService {
private baseApi: string = '/jogador';
constructor(private readonly snackBar: MatSnackBar,
  private readonly http: HttpClient) { }

list(): Observable<Jogador[]>{
  const params = new HttpParams().set('limit', '9999');

  return this.http.get<ResponseDataList<Jogador>>(environment.baseUrl+
    this.baseApi,
    { params })
    .pipe(map((resp) => resp.items));

  }

  create(jogador: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(environment.baseUrl + this.baseApi, jogador);
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
