import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario.model';
import { FuncionarioService } from '../funcionario.service';


@Component({
  selector: 'app-funcionario-create',
  templateUrl: './funcionario-create.component.html',
  styleUrls: ['./funcionario-create.component.scss']
})
export class FuncionarioCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router:Router,
    private readonly funcionarioService: FuncionarioService,
    private readonly fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      dataNascimento: [],
      endereco: []
    });
  }


  save(): void{
    this.form.markAllAsTouched();
     if(this.form.valid){
 
       const funcionario: Funcionario = this.form.value;
 
       this.funcionarioService.create(funcionario)
       .pipe(
         catchError((err) =>{
           this.funcionarioService.showMessage('Erro ao criar equipe', true);
           return err;
         })
       )
 
       .subscribe(resp => {
         this.funcionarioService.showMessage('Funcionario criada com sucesso!');
         this.router.navigate(['funcionario']);
       });
 
     }else{
       this.funcionarioService.showMessage('Dados incompletos', true);
     }
   }
 
 
   cancel():void{
     this.router.navigate(['funcionario/']);
   }
}
