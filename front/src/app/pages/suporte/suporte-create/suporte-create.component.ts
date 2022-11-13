import { Atendimento } from './../../../models/atendimento.model';
import { SuporteService } from './../suporte.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-suporte-create',
  templateUrl: './suporte-create.component.html',
  styleUrls: ['./suporte-create.component.scss']
})
export class SuporteCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router:Router,
    private readonly suporteService: SuporteService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
    });
  }

  save(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){

      const atendimento: Atendimento = this.form.value;

      this.suporteService.create(atendimento)
      .pipe(
        catchError((err) =>{
          this.suporteService.showMessage('Erro ao criar atendimento', true);
          return err;
        })
      )
      .subscribe(resp => {
        this.suporteService.showMessage('Atendimento criado com sucesso!');
        this.router.navigate(['suporte']);
      });

    }else{
      this.suporteService.showMessage('Dados incompletos', true);
    }
  }

  cancel():void{
    this.router.navigate(['suporte']);
  }
}
