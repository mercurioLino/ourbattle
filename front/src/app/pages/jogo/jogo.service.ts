import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { Jogo } from 'src/app/models/jogo.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private baseApi: string = '/jogo';
  constructor(private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient) { }
  
  list(): Observable<Jogo[]>{
    const params = new HttpParams().set('limit', '9999');
  
    return this.http.get<ResponseDataList<Jogo>>(environment.baseUrl+
      this.baseApi,
      { params })
      .pipe(map((resp) => resp.items));
  
    }
  
    create(jogo: Jogo): Observable<Jogo> {
      return this.http.post<Jogo>(environment.baseUrl + this.baseApi, jogo);
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
  
