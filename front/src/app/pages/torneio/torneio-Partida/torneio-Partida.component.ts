import { TorneioService } from "./../torneio.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import { Torneio } from "src/app/models/torneio.model";
import { Partida } from "src/app/models/partida.model";

@Component({
  selector: "app-torneio-Partida",
  templateUrl: "./torneio-Partida.component.html",
  styleUrls: ["./torneio-Partida.component.scss"],
})
export class TorneioPartidaComponent implements OnInit {
  torneios: Torneio[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly torneioService: TorneioService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.torneioService.listTorneio().subscribe((resp) => {
      this.torneios = resp;
      this.torneios.sort((a: Torneio, b: Torneio) =>
        a.nome.localeCompare(b.nome)
      );
    });

    this.form = this.fb.group({
      data: [null, [Validators.required]],
      hora: [null, [Validators.required]],
      torneio: [null, [Validators.required]],
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const {torneio,...partida}: any = this.form.value;
      console.log(torneio, partida);
      if (torneio.tipo === "TorneioIndividual") {
        this.torneioService
          .gerarPartidaIndividual(torneio.id, partida)
          .pipe(
            catchError((err) => {
              this.torneioService.showMessage("Erro ao gerar partidas", true);
              return err;
            })
          )

          .subscribe((resp) => {
            this.torneioService.showMessage("Partidas geradas com sucesso!");
            this.router.navigate(["torneio"]);
          });
      } else if(torneio.tipo === "TorneioEquipe"){
        this.torneioService
          .gerarPartidaEquipe(torneio.id, partida)
          .pipe(
            catchError((err) => {
              this.torneioService.showMessage("Erro ao gerar partidas", true);
              return err;
            })
          )

          .subscribe((resp) => {
            this.torneioService.showMessage("Partidas geradas com sucesso!");
            this.router.navigate(["torneio"]);
          });
      }
    } else {
      this.torneioService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["torneio"]);
  }
}
