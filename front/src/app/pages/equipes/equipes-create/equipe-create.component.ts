import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { EquipesService } from '../equipes.service';
import { JogadorService } from '../../jogador/jogador.service';
import { Jogador } from 'src/app/models/jogador.model';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Equipe } from 'src/app/models/equipe.model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-equipe-create',
  templateUrl: './equipe-create.component.html',
  styleUrls: ['./equipe-create.component.scss']
})
export class EquipeCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router:Router,
    private readonly equipesService: EquipesService,
    private readonly fb: FormBuilder

    ) { }



  ngOnInit(): void{
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
    });

  }

  save(): void{
    this.form.markAllAsTouched();
    if(this.form.valid){

      const equipe: Equipe = this.form.value;

      this.equipesService.create(equipe)
      .pipe(
        catchError((err) =>{
          this.equipesService.showMessage('Erro ao criar equipe', true);
          return err;
        })
      )

      .subscribe(resp => {
        this.equipesService.showMessage('Equipe criada com sucesso!');
        this.router.navigate(['equipe']);
      });

    }else{
      this.equipesService.showMessage('Dados incompletos', true);
    }
  }

  cancel():void{
    this.router.navigate(['equipe']);
  }
}
