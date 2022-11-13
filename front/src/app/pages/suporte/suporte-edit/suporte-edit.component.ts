import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { Suporte } from 'src/app/models/suporte.model';
import { SuporteService } from '../suporte.service';

@Component({
  selector: 'app-suporte-edit',
  templateUrl: './suporte-edit.component.html',
  styleUrls: ['./suporte-edit.component.scss']
})
export class SuporteEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  suporte!: Suporte;
  constructor(
    private readonly router: Router,
    private readonly suporteService: SuporteService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;

    this.form = this.fb.group({
      nome: [null, [Validators.required]],
    });

    this.suporteService.findById(this.id).subscribe((resp) => {
      this.suporte = resp;
      this.form.patchValue(this.suporte);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const suporte: Suporte = this.form.value;

      this.suporteService
        .update(this.id, suporte)
        .pipe(
          catchError((err) => {
            this.suporteService.showMessage("Erro ao alterar suporte", true);
            return err;
          })
        )

        .subscribe((resp) => {
          this.suporteService.showMessage("Suporte atualizada com sucesso!");
          this.router.navigate(["suporte"]);
        });
    } else {
      this.suporteService.showMessage("Dados incompletos", true);
    }
  }

  cancel(): void {
    this.router.navigate(["suporte"]);
  }
}
