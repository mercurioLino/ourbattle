import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Organizacao } from 'src/app/models/organizacao.model';
import { EquipesService } from '../../equipes/equipes.service';
import { OrganizacaoService } from '../organizacao.service';

@Component({
  selector: 'app-organizacoes-create',
  templateUrl: './organizacoes-create.component.html',
  styleUrls: ['./organizacoes-create.component.scss']
})
export class OrganizacoesCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router:Router,
    private readonly organizacaoService: OrganizacaoService,
    private readonly fb: FormBuilder

  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nomeFantasia: [],
      email: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      password: [null,[Validators.required]],
      razaoSocial: [null, [Validators.required]]
    });
  } 


  save(): void{
   this.form.markAllAsTouched();
    if(this.form.valid){

      const organizacao: Organizacao = this.form.value;

      this.organizacaoService.create(organizacao)
      .pipe(
        catchError((err) =>{
          this.organizacaoService.showMessage('Erro ao criar equipe', true);
          return err;
        })
      )

      .subscribe(resp => {
        this.organizacaoService.showMessage('Organizacao criada com sucesso!');
        this.router.navigate(['organizacao']);
      });

    }else{
      this.organizacaoService.showMessage('Dados incompletos', true);
    }
  }


  cancel():void{
    this.router.navigate(['organizacao/']);
  }

}
