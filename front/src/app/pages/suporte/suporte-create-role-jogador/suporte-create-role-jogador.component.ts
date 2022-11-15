import { AuthenticationService } from './../../../shared/authentication.service';

import { Suporte } from '../../../models/suporte.model';
import { SuporteService } from './../suporte.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { JogadorService } from '../../jogador/jogador.service';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Jogador } from 'src/app/models/jogador.model';
import { OrganizacaoService } from '../../organizacao/organizacao.service';
import { Organizacao } from 'src/app/models/organizacao.model';

@Component({
  selector: 'app-suporte-create-role-jogador',
  templateUrl: './suporte-create-role-jogador.component.html',
  styleUrls: ['./suporte-create-role-jogador.component.scss']
})
export class SuporteCreateRoleJogadorComponent implements OnInit {

  jogadores: Jogador[] = [];
  organizacoes: Organizacao[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router:Router,
    private readonly suporteService: SuporteService,
    private readonly jogadorService: JogadorService,
    private readonly organizacaoService: OrganizacaoService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      jogador: [null, [Validators.required]],
      organizacao: [null, [Validators.required]],
    });

    const data = this.authenticationService.getCurrentUserValue();

    this.jogadorService.listJogador().subscribe((resp) => {
      this.jogadores = resp.filter(v=>v.id === data?.id)
    });

    this.organizacaoService.listOrganizacao().subscribe((resp) => {
      this.organizacoes = resp;
      this.organizacoes.sort((a: Organizacao, b: Organizacao) =>
        a.razaoSocial.localeCompare(b.razaoSocial)
      );
    });
  }

  save(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){

      const suporte: Suporte = this.form.value;

      this.suporteService.create(suporte)
      .pipe(
        catchError((err) =>{
          this.suporteService.showMessage('Erro ao criar suporte', true);
          return err;
        })
      )
      .subscribe(resp => {
        this.suporteService.showMessage('Suporte criado com sucesso!');
        this.router.navigate(['suporte']);
      });

    }else{
      this.suporteService.showMessage('Dados incompletos', true);
    }
  }

  cancel():void{
    this.router.navigate(['suporte']);
  }
}
