import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { EquipesService } from "../equipes.service";
import { JogadorService } from "../../jogador/jogador.service";
import { Jogador } from "src/app/models/jogador.model";
import {
  FormBuilder,
  FormGroup,
  RequiredValidator,
  Validators,
} from "@angular/forms";
import { Equipe } from "src/app/models/equipe.model";
import { catchError } from "rxjs";

@Component({
  selector: "app-equipe-edit",
  templateUrl: "./equipe-edit.component.html",
  styleUrls: ["./equipe-edit.component.scss"],
})
export class EquipeEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  equipe!: Equipe;
  constructor(
    private readonly router: Router,
    private readonly equipesService: EquipesService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
    });

    this.equipesService.findById(this.id).subscribe((resp) => {
      this.equipe = resp;
      this.form.patchValue(this.equipe);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const equipe: Equipe = this.form.value;

      this.equipesService
        .update(this.id, equipe)
        .pipe(
          catchError((err) => {
            this.equipesService.showMessage("Erro ao alterar equipe", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.equipesService.showMessage("Equipe atualizada com sucesso!");
          this.router.navigate(["equipe"]);
        });
    } else {
      this.equipesService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["equipe"]);
  }
}
