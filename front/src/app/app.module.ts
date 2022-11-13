import { SuporteComponent } from './pages/suporte/suporte/suporte.component';
import { JsonDateInterceptor } from './interceptors/json-date.interceptor';
import { JwtAuthInterceptor } from './interceptors/jwt-auth.interceptor';
import { JogadorCreateComponent } from './pages/jogador/jogador-create/jogador-create.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedDirective } from './directives/red.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavComponent } from './layout/nav/nav.component';
import {MatDialogModule} from  '@angular/material/dialog'
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './pages/home/home.component';
import { EquipeComponent } from './pages/equipe/equipe/equipe.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EquipeCreateComponent } from './pages/equipe/equipe-create/equipe-create.component';
import { TorneiosComponent } from './pages/torneio/torneio/torneio.component';
import { OrganizacaoComponent } from './pages/organizacao/organizacao/organizacao.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResponseDataList } from './models/shared';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatListOption } from '@angular/material/list';
import { MatSelectionList } from '@angular/material/list';
import { JogadorComponent } from './pages/jogador/jogador/jogador.component';
import { OrganizacaoCreateComponent } from './pages/organizacao/organizacao-create/organizacao-create.component';
import { TorneioCreateComponent } from './pages/torneio/torneio-create/torneio-create.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario/funcionario.component';
import { FuncionarioCreateComponent } from './pages/funcionario/funcionario-create/funcionario-create.component';
import { JogoComponent } from './pages/jogo/jogo/jogo.component';
import { JogoCreateComponent } from './pages/jogo/jogo-create/jogo-create.component';
import { PageComponent } from './layout/page/page.component';
import { LoginComponent } from './pages/login/login.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SuporteCreateComponent } from './pages/suporte/suporte-create/suporte-create.component';
import { EquipeEditComponent } from './pages/equipe/equipe-edit/equipe-edit.component';
import { EquipeDeleteComponent } from './pages/equipe/equipe-delete/equipe-delete.component';
import { FuncionarioEditComponent } from './pages/funcionario/funcionario-edit/funcionario-edit.component';
import { FuncionarioDeleteComponent } from './pages/funcionario/funcionario-delete/funcionario-delete.component';
import { TorneioEditComponent } from './pages/torneio/torneio-edit/torneio-edit.component';
import { TorneioDeleteComponent } from './pages/torneio/torneio-delete/torneio-delete.component';
import { JogadorEditComponent } from './pages/jogador/jogador-edit/jogador-edit.component';
import { JogadorDeleteComponent } from './pages/jogador/jogador-delete/jogador-delete.component';
import { JogoEditComponent } from './pages/jogo/jogo-edit/jogo-edit.component';
import { JogoDeleteComponent } from './pages/jogo/jogo-delete/jogo-delete.component';
import { OrganizacaoEditComponent } from './pages/organizacao/organizacao-edit/organizacao-edit.component';
import { OrganizacaoDeleteComponent } from './pages/organizacao/organizacao-delete/organizacao-delete.component';
import { SuporteEditComponent } from './pages/suporte/suporte-edit/suporte-edit.component';
import { SuporteDeleteComponent } from './pages/suporte/suporte-delete/suporte-delete.component';
import { PerfilComponent } from './pages/perfil/perfil/perfil.component';
import { PerfilCreateComponent } from './pages/perfil/perfil-create/perfil-create.component';
import { PerfilEditComponent } from './pages/perfil/perfil-edit/perfil-edit.component';
import { PerfilDeleteComponent } from './pages/perfil/perfil-delete/perfil-delete.component'



@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    FooterComponent,
    RedDirective, 
    JogadorComponent, 
    JogadorCreateComponent,
    NavComponent, 
    FuncionarioComponent,
    FuncionarioCreateComponent,
    HomeComponent, 
    EquipeComponent, 
    EquipeCreateComponent,
    OrganizacaoComponent, 
    OrganizacaoCreateComponent, 
    TorneiosComponent, 
    TorneioCreateComponent, 
    FuncionarioComponent, 
    FuncionarioCreateComponent,
    JogoComponent,
    JogoCreateComponent,
    PageComponent, 
    LoginComponent, 
    SuporteComponent, 
    SuporteCreateComponent, EquipeEditComponent, EquipeDeleteComponent, FuncionarioEditComponent, FuncionarioDeleteComponent, TorneioEditComponent, TorneioDeleteComponent, JogadorEditComponent, JogadorDeleteComponent, JogoEditComponent, JogoDeleteComponent, OrganizacaoEditComponent, OrganizacaoDeleteComponent, SuporteEditComponent, SuporteDeleteComponent, PerfilComponent, PerfilCreateComponent, PerfilEditComponent, PerfilDeleteComponent, 
  ],
  imports: [
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
