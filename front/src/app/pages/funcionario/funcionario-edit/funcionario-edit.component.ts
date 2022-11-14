import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs";
import { Funcionario } from "src/app/models/funcionario.model";
import { FuncionarioService } from "../funcionario.service";

@Component({
  selector: "app-funcionario-edit",
  templateUrl: "./funcionario-edit.component.html",
  styleUrls: ["./funcionario-edit.component.scss"],
})
export class FuncionarioEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  funcionario!: Funcionario;
  constructor(
    private readonly router: Router,
    private readonly funcionarioService: FuncionarioService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
    });

    this.funcionarioService.findById(this.id).subscribe((resp) => {
      this.funcionario = resp;
      this.form.patchValue(this.funcionario);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const funcionario: Funcionario = this.form.value;

      this.funcionarioService
        .update(this.id, funcionario)
        .pipe(
          catchError((err) => {
            this.funcionarioService.showMessage("Erro ao alterar funcionario", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.funcionarioService.showMessage("Funcionario atualizada com sucesso!");
          this.router.navigate(["funcionario"]);
        });
    } else {
      this.funcionarioService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["funcionario"]);
  }
}
