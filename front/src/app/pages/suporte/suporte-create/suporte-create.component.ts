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

@Component({
  selector: 'app-suporte-create',
  templateUrl: './suporte-create.component.html',
  styleUrls: ['./suporte-create.component.scss']
})
export class SuporteCreateComponent implements OnInit {

  jogadores: Jogador[] = [];
  funcionarios: Funcionario[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router:Router,
    private readonly suporteService: SuporteService,
    private readonly jogadorService: JogadorService,
    private readonly funcionarioService: FuncionarioService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      jogador: [null, [Validators.required]],
      funcionario: [null, [Validators.required]],
    });

    this.jogadorService.listJogador().subscribe((resp) => {
      this.jogadores = resp;
      this.jogadores.sort((a: Jogador, b: Jogador) =>
        a.nickname.localeCompare(b.nickname)
      );
    });

    this.funcionarioService.listFuncionario().subscribe((resp) => {
      this.funcionarios = resp;
      this.funcionarios.sort((a: Funcionario, b: Funcionario) =>
        a.nome.localeCompare(b.nome)
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
