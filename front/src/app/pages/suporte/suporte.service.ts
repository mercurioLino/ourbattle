import { Atendimento } from './../../models/atendimento.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuporteService {
  private baseApi: string = '/suporte';

  constructor(private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient) { }

  list(): Observable<Atendimento[]>{
    const params = new HttpParams().set('limit', '9999');
  
    return this.http.get<ResponseDataList<Atendimento>>(environment.baseUrl+
      this.baseApi,
      { params })
      .pipe(map((resp) => resp.items));
  
    }
  
    create(atendimento: Atendimento): Observable<Atendimento> {
      return this.http.post<Atendimento>(environment.baseUrl + this.baseApi, atendimento);
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
