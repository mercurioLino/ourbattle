
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { map, Observable } from "rxjs";
import { Equipe } from "src/app/models/equipe.model";
import { Jogador } from "src/app/models/jogador.model";
import { ResponseDataList } from "src/app/models/shared";
import { Torneio } from "src/app/models/torneio.model";
import { Partida } from "src/app/models/partida.model";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class TorneioService {
  private baseApi: string = "/torneio";
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Torneio>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Torneio>>(
      environment.baseUrl + this.baseApi,
      { params }
    );
  }

  listTorneio(): Observable<Torneio[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Torneio>>(environment.baseUrl + this.baseApi + '', {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  listTorneioIndividual(): Observable<Torneio[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Torneio>>(environment.baseUrl + this.baseApi + '/individual', {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  listTorneioEquipe(): Observable<Torneio[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Torneio>>(environment.baseUrl + this.baseApi + '/equipe', {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  createTorneio(
    torneio: Torneio,
    tipo: "individual" | "equipe"
  ): Observable<Torneio> {
    return this.http.post<Torneio>(
      environment.baseUrl + `/torneio/${tipo}`,
      torneio
    );
  }

  findById(id: number): Observable<Torneio> {
    return this.http.get<Torneio>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, equipe: Torneio): Observable<Torneio> {
    return this.http.patch<Torneio>(
      environment.baseUrl + this.baseApi + "/" + id,
      equipe
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  showMessage(msg: string, IsError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: IsError ? ["msg-error"] : ["msg-success"],
    });
  }

  inserirJogador(id:number, jogador: Jogador): Observable<Torneio> {
    return this.http.post<Torneio>(environment.baseUrl + this.baseApi + `/${id}` + "/add-jogador", jogador);
  }

  gerarPartidaIndividual(id:number, partida: Partida): Observable<Torneio> {
    return this.http.post<Torneio>(environment.baseUrl + this.baseApi + `/individual/${id}` + "/gerar-partidas", partida);
  }

  gerarPartidaEquipe(id:number, partida: Partida): Observable<Torneio> {
    return this.http.post<Torneio>(environment.baseUrl + this.baseApi + `/equipe/${id}` + "/gerar-partidas", partida);
  }

  inserirEquipe(id:number, equipe: Equipe): Observable<Torneio> {
    return this.http.post<Torneio>(environment.baseUrl + this.baseApi + `/${id}` + "/add-equipe", equipe);
  }
}
