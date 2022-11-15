
import { Organizacao } from './../../../models/organizacao.model';
import { TorneioEquipe } from './../../../models/torneioEquipe.model';
import { TorneioIndividual } from './../../../models/torneioIndividual.model';
import { Torneio } from './../../../models/torneio.model';
import { TorneioService } from './../torneio.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Jogo } from 'src/app/models/jogo.model';
import { JogoService } from '../../jogo/jogo.service';
import { OrganizacaoService } from '../../organizacao/organizacao.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-torneio-create-role-organizacao',
  templateUrl: './torneio-create-role-organizacao.component.html',
  styleUrls: ['./torneio-create-role-organizacao.component.scss']
})
export class TorneioCreateRoleOrganizacaoComponent implements OnInit {

  jogos: Jogo[] = [];
  organizacao: Organizacao[] = [];

  constructor(
    private readonly router:Router,
    private readonly torneioService: TorneioService,
    private readonly jogoService: JogoService,
    private readonly organizacaoService: OrganizacaoService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder
  ) { }

  form: FormGroup = new FormGroup({});
  formTorneio: FormGroup = new FormGroup({});
  ngOnInit(): void {

    const id = this.authenticationService.getCurrentUserValue()?.id;
    this.jogoService.listJogo().subscribe((resp) => {
      this.jogos = resp;
      this.jogos.sort((a: Jogo, b: Jogo) =>
        a.nome.localeCompare(b.nome)
      );
    });

    this.organizacaoService.listOrganizacao().subscribe((resp) => {
      this.organizacao = resp.filter(v => v.id == id)
    });

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      data: [null, [Validators.required]],
      hora: [null, [Validators.required]],
      premiacao: [null, [Validators.required]],
      regras: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      jogo: [null, [Validators.required]],
      organizacao: [null, [Validators.required]],
    });
   
  }

  save(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){
      const {tipo,...torneio} = this.form.value;
      torneio.status = 'Inscrições Abertas'
      torneio.premiacao = Number(torneio.premiacao);
      this.torneioService.createTorneio(torneio, tipo)
      .pipe(
        catchError((err) =>{ 
          this.torneioService.showMessage('Erro ao criar torneio', true);
          return err;
        })
      )
      .subscribe(resp => {
        this.torneioService.showMessage('Torneio criado com sucesso!');
        this.router.navigate(['torneio']);
      });

    }else{
      this.torneioService.showMessage('Dados incompletos', true);
    }
    
  }

  cancel():void{
    this.router.navigate(['torneio']);
  }
}
