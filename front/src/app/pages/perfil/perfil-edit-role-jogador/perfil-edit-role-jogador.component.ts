import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs";
import { Jogador } from "src/app/models/jogador.model";
import { Perfil } from "src/app/models/perfil.model";
import { AuthenticationService } from "src/app/shared/authentication.service";
import { PerfilService } from "../perfil.service";

@Component({
  selector: "app-perfil-edit-role-jogador",
  templateUrl: "./perfil-edit-role-jogador.component.html",
  styleUrls: ["./perfil-edit-role-jogador.component.scss"],
})
export class PerfilEditRoleJogadorComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  formPerfil: FormGroup = new FormGroup({});
  perfis: Perfil[] = [];
  perfil!: Perfil;
  idJogador!: number
  constructor(
    private readonly router: Router,
    private readonly perfilService: PerfilService,
    private readonly fb: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idJogador = Number(this.authenticationService.getCurrentUserValue()?.id)
    this.formPerfil = this.fb.group({
      perfil: [null, [Validators.required]],
    })
    this.form = this.fb.group({
      nickname: [null, [Validators.required]],
      elo: [null, [Validators.required]],
    });

    this.perfilService.listPerfil().subscribe((resp) => {
      this.perfis = resp.filter(v => v.jogador.id === this.idJogador)
    })

    this.formPerfil.get('perfil')?.valueChanges.subscribe((resp) => {
      this.id = resp.id;
      this.form.patchValue(resp);
    });

  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const perfil: Perfil = this.form.value
      this.perfilService
        .update(this.id, perfil)
        .pipe(
          catchError((err) => {
            this.perfilService.showMessage("Erro ao alterar perfil", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.perfilService.showMessage("Perfil atualizada com sucesso!");
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
