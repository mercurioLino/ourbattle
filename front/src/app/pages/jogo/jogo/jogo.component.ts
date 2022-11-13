import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, merge, of, startWith, Subscription, switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Jogo } from 'src/app/models/jogo.model';
import { JogoService } from '../jogo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  isLoadingResults: boolean = true;
  data: Jogo[]=[]
  resultsLength: number =0;
  subscriptions: Subscription[]=[]
  displayedColumns: string[]  = ['id','nome', 'categoria', 'actions']

  constructor(private readonly router:Router,
    private readonly jogoService: JogoService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const sub = merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() =>{
        this.isLoadingResults = true;
        return this.jogoService
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

  navigateToJogoCreate(): void {
    this.router.navigate(['jogo/create']);
  }
}

