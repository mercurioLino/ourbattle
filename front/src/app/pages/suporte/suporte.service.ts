import { Suporte } from '../../models/suporte.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class SuporteService {
  baseApi = "/suporte";

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  create(suporte: Suporte): Observable<Suporte> {
    return this.http.post<Suporte>(environment.baseUrl + this.baseApi, suporte);
  }

  findById(id: number): Observable<Suporte> {
    return this.http.get<Suporte>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, suporte: Suporte): Observable<Suporte> {
    return this.http.patch<Suporte>(
      environment.baseUrl + this.baseApi + "/" + id,
      suporte
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
  ): Observable<ResponseDataList<Suporte>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Suporte>>(
      environment.baseUrl + this.baseApi,
      { params }
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
}
