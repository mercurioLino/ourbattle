import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { AuthenticationService } from "src/app/shared/authentication.service";
import { MatPaginator } from "@angular/material/paginator";
import {
  Subscription,
  merge,
  startWith,
  switchMap,
  catchError,
  of,
  map,
} from "rxjs";
import { Funcionario } from "src/app/models/funcionario.model";
import { FuncionarioService } from "../funcionario.service";
@Component({
  selector: "app-funcionario",
  templateUrl: "./funcionario.component.html",
  styleUrls: ["./funcionario.component.scss"],
})
export class FuncionarioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Funcionario[] = [];
  resultsLength: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ["id", "nome", "actions"];
  user: User | null = null;
  constructor(
    private readonly router: Router,
    private readonly funcionarioService: FuncionarioService,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUserValue();
  }
  ngAfterViewInit(): void {
    const sub = merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.funcionarioService
            .list(this.paginator.pageIndex + 1, this.paginator.pageSize)
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          if (data) {
            this.resultsLength = data.meta.totalItems;
            return data.items;
          }
          return [];
        })
      )
      .subscribe((data) => (this.data = data));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  navigateToFuncionarioCreate(): void {
    this.router.navigate(["funcionario/create"]);
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }
}
