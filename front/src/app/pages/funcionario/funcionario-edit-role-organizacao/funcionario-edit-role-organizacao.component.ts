import { AuthenticationService } from './../../../shared/authentication.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario.model';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-funcionario-edit-role-organizacao',
  templateUrl: './funcionario-edit-role-organizacao.component.html',
  styleUrls: ['./funcionario-edit-role-organizacao.component.scss']
})
export class FuncionarioEditRoleOrganizacaoComponent implements OnInit  {
  id!: number;
  form: FormGroup = new FormGroup({});
  funcionario!: Funcionario;
  formFuncionario: FormGroup = new FormGroup({});
  funcionarios: Funcionario[] = [];
  idOrganizacao!: number
  constructor(
    private readonly router: Router,
    private readonly funcionarioService: FuncionarioService,
    private readonly authenticationService: AuthenticationService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idOrganizacao = Number(this.authenticationService.getCurrentUserValue()?.id);

    this.formFuncionario = this.fb.group({
      funcionario: [null, [Validators.required]],
    })

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

    this.funcionarioService.listFuncionario().subscribe((resp) => {
      this.funcionarios = resp.filter(v => v.organizacao.id === this.idOrganizacao)
    })

    this.formFuncionario.get('funcionario')?.valueChanges.subscribe((resp) => {
      this.id = resp.id;
      this.form.patchValue(resp);
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
