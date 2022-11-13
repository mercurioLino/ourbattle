import { RoleGuard } from './guards/role.guard';
import { PageComponent } from './layout/page/page.component';
import { JogadorCreateComponent } from './pages/jogador/jogador-create/jogador-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipeCreateComponent } from './pages/equipe/equipe-create/equipe-create.component';
import { EquipeComponent } from './pages/equipe/equipe/equipe.component';
import { HomeComponent } from './pages/home/home.component';
import { JogadorComponent } from './pages/jogador/jogador/jogador.component';
import { OrganizacaoCreateComponent } from './pages/organizacao/organizacao-create/organizacao-create.component';
import { OrganizacaoComponent } from './pages/organizacao/organizacao/organizacao.component';
import { TorneiosComponent } from './pages/torneio/torneio/torneio.component';
import { FuncionarioCreateComponent } from './pages/funcionario/funcionario-create/funcionario-create.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario/funcionario.component';
import { TorneioCreateComponent } from './pages/torneio/torneio-create/torneio-create.component';
import { JogoCreateComponent } from './pages/jogo/jogo-create/jogo-create.component';
import { JogoComponent } from './pages/jogo/jogo/jogo.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { Role } from './models/user.model';
import { SuporteCreateComponent } from './pages/suporte/suporte-create/suporte-create.component';
import { SuporteComponent } from './pages/suporte/suporte/suporte.component';
import { EquipeEditComponent } from './pages/equipe/equipe-edit/equipe-edit.component';
import { TorneioEditComponent } from './pages/torneio/torneio-edit/torneio-edit.component';
import { JogadorEditComponent } from './pages/jogador/jogador-edit/jogador-edit.component';
import { FuncionarioEditComponent } from './pages/funcionario/funcionario-edit/funcionario-edit.component';
import { JogoEditComponent } from './pages/jogo/jogo-edit/jogo-edit.component';
import { OrganizacaoEditComponent } from './pages/organizacao/organizacao-edit/organizacao-edit.component';
import { SuporteEditComponent } from './pages/suporte/suporte-edit/suporte-edit.component';
import { PerfilCreateComponent } from './pages/perfil/perfil-create/perfil-create.component';
import { PerfilEditComponent } from './pages/perfil/perfil-edit/perfil-edit.component';
import { PerfilComponent } from './pages/perfil/perfil/perfil.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', 
  component: PageComponent,
  canActivate: [AuthenticationGuard],
  canActivateChild: [AuthenticationGuard],
  children: [
    {path:'', component: HomeComponent},

    {path: 'equipe',
    children
    : [
        {path: '', component: EquipeComponent},
        {path:'create', component: EquipeCreateComponent,canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
        {path: ':id/edit', component: EquipeEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},

    ]},
  
    {path: 'jogador',  children
    :[
      {path: '', component: JogadorComponent},
      {path: 'create', component: JogadorCreateComponent},
      {path: ':id/edit', component: JogadorEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
    ]},
  
    {path: 'jogo',  children
    :[
      {path: '', component: JogoComponent},
      {path: 'create', component: JogoCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: ':id/edit', component: JogoEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
    ]},

    {path: 'perfil',  children
    :[
      {path: '', component: PerfilComponent},
      {path: 'create', component: PerfilCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
      {path: ':id/edit', component: PerfilEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
    ]},

    {path: 'torneio',  children
    :[
      {path: '', component: TorneiosComponent},
      {path: 'create', component: TorneioCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},
      {path: ':id/edit', component: TorneioEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},

    ]},
  
    {path: 'organizacao', children
    : [
        {path: '', component: OrganizacaoComponent},
        {path:'create', component: OrganizacaoCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
        {path: ':id/edit', component: OrganizacaoEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},
    ]},
  
    {path: 'funcionario', children
    : [
        {path: '', component: FuncionarioComponent},
        {path:'create', component: FuncionarioCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},
        {path: ':id/edit', component: FuncionarioEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},

    ]},

    {path: 'suporte', children
    : [
        {path: '', component: SuporteComponent},
        {path:'create', component: SuporteCreateComponent},
        {path: ':id/edit', component: SuporteEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao, Role.Funcionario]}},
    ]},
  ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
