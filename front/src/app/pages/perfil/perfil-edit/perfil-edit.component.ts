import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs";
import { Perfil } from "src/app/models/perfil.model";
import { PerfilService } from "../perfil.service";

@Component({
  selector: "app-perfil-edit",
  templateUrl: "./perfil-edit.component.html",
  styleUrls: ["./perfil-edit.component.scss"],
})
export class PerfilEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  perfil!: Perfil;
  constructor(
    private readonly router: Router,
    private readonly perfilService: PerfilService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;

    this.form = this.fb.group({
      nickname: [null, [Validators.required]],
      elo: [null, [Validators.required]]
    });

    this.perfilService.findById(this.id).subscribe((resp) => {
      this.perfil = resp;
      this.form.patchValue(this.perfil);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const perfil: Perfil = this.form.value;

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
