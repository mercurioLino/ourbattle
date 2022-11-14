import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import { Jogador } from "src/app/models/jogador.model";
import { Jogo } from "src/app/models/jogo.model";
import { Perfil } from "src/app/models/perfil.model";
import { JogadorService } from "../../jogador/jogador.service";
import { JogoService } from "../../jogo/jogo.service";
import { PerfilService } from "../perfil.service";

@Component({
  selector: "app-perfil-create-role-jogador",
  templateUrl: "./perfil-create-role-jogador.component.html",
  styleUrls: ["./perfil-create-role-jogador.component.scss"],
})
export class PerfilCreateRoleJogadorComponent implements OnInit {
  jogos: Jogo[] = [];
  jogadores: Jogador[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly perfilService: PerfilService,
    private readonly jogoService: JogoService,
    private readonly jogadorService: JogadorService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    const data = this.authenticationService.getCurrentUserValue();
    
    this.jogoService.listJogo().subscribe((resp) => {
      this.jogos = resp;
      this.jogos.sort((a: Jogo, b: Jogo) => a.nome.localeCompare(b.nome));
    });

    this.jogadorService.listJogador().subscribe((resp) => {
      this.jogadores = resp.filter(v => v.id === data?.id)
    });

    this.form = this.fb.group({
      nickname: [null, [Validators.required]],
      elo: [null, [Validators.required]],
      jogador: [null, [Validators.required]],
      jogo: [null, [Validators.required]],
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const perfil: Perfil = this.form.value;

      this.perfilService
        .create(perfil)
        .pipe(
          catchError((err) => {
            this.perfilService.showMessage("Erro ao criar perfil", true);
            return err;
          })
        )
        .subscribe((resp) => {
          this.perfilService.showMessage("Perfil criado com sucesso!");
          this.router.navigate(["perfil"]);
        });
    } else {
      this.perfilService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["perfil"]);
  }
}
