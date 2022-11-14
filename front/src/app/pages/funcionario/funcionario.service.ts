import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { Funcionario } from "src/app/models/funcionario.model";
import { ResponseDataList } from "src/app/models/shared";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FuncionarioService {
  baseApi = "/funcionario";

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  create(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(environment.baseUrl + this.baseApi, funcionario);
  }

  findById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.patch<Funcionario>(
      environment.baseUrl + this.baseApi + "/" + id,
      funcionario
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
  ): Observable<ResponseDataList<Funcionario>> {
    let params = new HttpParams().set("page", page).set("limit", limit);

    if (search?.trim()) {
      params = params.set("search", search.trim());
    }

    return this.http.get<ResponseDataList<Funcionario>>(
      environment.baseUrl + this.baseApi,
      { params }
    );
  }

  listFuncionario(): Observable<Funcionario[]> {
    const params = new HttpParams().set("limit", "99");

    return this.http
      .get<ResponseDataList<Funcionario>>(environment.baseUrl + this.baseApi, {
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
