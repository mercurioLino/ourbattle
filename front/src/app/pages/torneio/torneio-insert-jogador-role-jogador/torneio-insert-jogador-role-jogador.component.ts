import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Jogador } from 'src/app/models/jogador.model';
import { Torneio } from 'src/app/models/torneio.model';
import { TorneioService } from '../../torneio/torneio.service';
import { JogadorService } from '../../jogador/jogador.service';

@Component({
  selector: 'app-torneio-insert-jogador-role-jogador',
  templateUrl: './torneio-insert-jogador-role-jogador.component.html',
  styleUrls: ['./torneio-insert-jogador-role-jogador.component.scss']
})
export class TorneioInsertJogadorRoleJogadorComponent implements OnInit {
  jogadores: Jogador[] = [];
  torneios: Torneio[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly torneioService: TorneioService,
    private readonly jogadorService: JogadorService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {

    const data = this.authenticationService.getCurrentUserValue();
    this.jogadorService.listJogador().subscribe((resp) => {
      this.jogadores = resp.filter(v => v.id === data?.id);
    });

    this.torneioService.listTorneioIndividual().subscribe((resp) => {
      this.torneios = resp;
      this.torneios.sort((a: Torneio, b: Torneio) => a.nome.localeCompare(b.nome));
    });

    this.form = this.fb.group({
      jogador: [null, [Validators.required]],
      torneio: [null, [Validators.required]],
    });
  }

  save(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const data: any = this.form.value;

      this.torneioService
        .inserirJogador(data.torneio.id, data.jogador)
        .pipe(
          catchError((err) => {
            this.torneioService.showMessage("Erro ao inserir jogador no torneio", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.torneioService.showMessage("Jogador inserido com sucesso");
          this.router.navigate(["torneio"]);
        });
    } else {
      this.torneioService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["torneio"]);
  }
}
