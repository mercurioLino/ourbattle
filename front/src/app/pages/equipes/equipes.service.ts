import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Equipe } from 'src/app/models/equipe.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  baseApi = "/equipe";

constructor(private readonly snackBar: MatSnackBar,
  private readonly http: HttpClient) { }

  create(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(environment.baseUrl + this.baseApi, equipe);
  }

  findById(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(environment.baseUrl + this.baseApi + "/" + id);
  }

  update(id: number, equipe: Equipe): Observable<Equipe> {
    return this.http.patch<Equipe>(environment.baseUrl + this.baseApi + "/" + id, equipe);
  }

  delete(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(environment.baseUrl + this.baseApi + "/" + id); 
  }

  list(
      page: number,
      limit: number,
      search?: string): Observable<ResponseDataList<Equipe>>{
        let params = new HttpParams().set('page', page).set('limit', limit)

        if(search?.trim()){
          params = params.set('search', search.trim())
        }
        
       return this.http.get<ResponseDataList<Equipe>>(
        environment.baseUrl + this.baseApi, {params}
      );
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
