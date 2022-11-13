import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Organizacao } from 'src/app/models/organizacao.model';
import { ResponseDataList } from 'src/app/models/shared';
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

  findById(id: number): Observable<Organizacao> {
    return this.http.get<Organizacao>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, organizacao: Organizacao): Observable<Organizacao> {
    return this.http.patch<Organizacao>(environment.baseUrl + this.baseApi + "/" + id, organizacao);
  }

  delete(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(environment.baseUrl + this.baseApi + "/" + id); 
  }

  list(
      page: number,
      limit: number,
      search?: string): Observable<ResponseDataList<Organizacao>>{
        let params = new HttpParams().set('page', page).set('limit', limit)

        if(search?.trim()){
          params = params.set('search', search.trim())
        }
        
       return this.http.get<ResponseDataList<Organizacao>>(
        environment.baseUrl + this.baseApi, {params}
      );
  }
}
