import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { Perfil } from "src/app/models/perfil.model";
import { ResponseDataList } from "src/app/models/shared";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PerfilService {
  baseApi = "/perfil";

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  create(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(environment.baseUrl + this.baseApi, perfil);
  }

  findById(id: number): Observable<Perfil> {
    return this.http.get<Perfil>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, perfil: Perfil): Observable<Perfil> {
    return this.http.patch<Perfil>(
      environment.baseUrl + this.baseApi + "/" + id,
      perfil
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseUrl + this.baseApi + `/${id}`
    );
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Perfil>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Perfil>>(
      environment.baseUrl + this.baseApi,
      { params }
    );
  }
  
  listPerfil(): Observable<Perfil[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Perfil>>(environment.baseUrl + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  showMessage(msg: string, IsError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: IsError ? ["msg-error"] : ["msg-success"],
    });
  }
}
