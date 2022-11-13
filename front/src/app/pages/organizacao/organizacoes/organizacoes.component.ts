import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Router } from '@angular/router'
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, merge, startWith, switchMap, catchError, of, map } from 'rxjs';
import { Organizacao } from 'src/app/models/organizacao.model';
import { OrganizacaoService } from '../organizacao.service';
@Component({
  selector: 'app-organizacoes',
  templateUrl: './organizacoes.component.html',
  styleUrls: ['./organizacoes.component.scss']
})
export class OrganizacoesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Organizacao[]=[]
  resultsLength: number =0;
  subscriptions: Subscription[]=[]
  displayedColumns: string[]  = ['id','razaoSocial', 'cnpj','actions']

  user: User | null = null;
  constructor(private readonly router:Router,
    private readonly authenticationService: AuthenticationService,
    private readonly organizacaoService: OrganizacaoService) { }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUserValue();
  }

  ngAfterViewInit(): void {
    const sub = merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() =>{
        this.isLoadingResults = true;
        return this.organizacaoService
        .list(this.paginator.pageIndex +1, this.paginator.pageSize)
        .pipe(catchError(() => of(null)));
      }),
      map((data) => {
        this.isLoadingResults = false;
        if(data){
          this.resultsLength = data.meta.totalItems
          return data.items
        }
        return[]
      })
    ).subscribe((data) => this.data = data);
    this.subscriptions.push(sub)
  }

  ngOnDestroy(): void {   
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  
  navigateToOrganizacaoCreate(): void {
    this.router.navigate(['organizacao/create']);
  }

  checkRole(roles: string[]): boolean{
    return !!this.user && (roles.indexOf(this.user.role) > -1);
  }
}
