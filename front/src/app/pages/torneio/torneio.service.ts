import { TorneioEquipe } from './../../models/torneioEquipe.model';
import { TorneioIndividual } from './../../models/torneioIndividual.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { Jogador } from 'src/app/models/jogador.model';
import { ResponseDataList } from 'src/app/models/shared';
import { Torneio } from 'src/app/models/torneio.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TorneioService {
  private baseApi: string = '/torneios';
  constructor(private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient) { }
  
  list(): Observable<Torneio[]>{
    const params = new HttpParams().set('limit', '9999');
  
    return this.http.get<ResponseDataList<Torneio>>(environment.baseUrl+
      this.baseApi,
      { params })
      .pipe(map((resp) => resp.items));
  
    }
  
    createTorneio(torneio: Torneio, tipo: "individual" | "equipe"): Observable<Torneio> {
      return this.http.post<Torneio>(environment.baseUrl + `/torneio/${tipo}`, torneio);
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
  