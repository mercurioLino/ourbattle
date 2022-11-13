import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-perfil-create',
  templateUrl: './perfil-create.component.html',
  styleUrls: ['./perfil-create.component.scss']
})
export class PerfilCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly perfilService: PerfilService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      regras: [null, [Validators.required]],
    });
  }

  save(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){

      const perfil: Perfil = this.form.value;

      this.perfilService.create(perfil)
      .pipe(
        catchError((err) =>{
          this.perfilService.showMessage('Erro ao criar perfil', true);
          return err;
        })
      )
      .subscribe(resp => {
        this.perfilService.showMessage('Perfil criado com sucesso!');
        this.router.navigate(['perfil']);
      });

    }else{
      this.perfilService.showMessage('Dados incompletos', true);
    }
  }

  cancel():void{
    this.router.navigate(['perfil']);
  }
}
