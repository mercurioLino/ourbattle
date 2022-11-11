import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Equipe } from 'src/app/models/equipe.model'
import {AfterViewInit, OnDestroy} from '@angular/core'
import {Subscription, merge, startWith, switchMap, catchError, map, of} from 'rxjs'
import { MatPaginator } from '@angular/material/paginator';
import { EquipesService } from '../equipes.service';
@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Equipe[]=[]
  resultsLength: number =0;
  subscriptions: Subscription[]=[]
  displayedColumns: string[]  = ['id','nome', 'actions']

  constructor(
    private readonly router:Router,
    private readonly equipeService: EquipesService
    ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const sub = merge(this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() =>{
        this.isLoadingResults = true;
        return this.equipeService
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

  navigateToEquipeCreate(): void {
    this.router.navigate(['equipe/create']);
  }

}
