import { TorneioPartidaComponent } from './pages/torneio/torneio-Partida/torneio-Partida.component';
import { FuncionarioEditRoleOrganizacaoComponent } from './pages/funcionario/funcionario-edit-role-organizacao/funcionario-edit-role-organizacao.component';
import { OrganizacaoEditRoleOrganizacaoComponent } from './pages/organizacao/organizacao-edit-role-organizacao/organizacao-edit-role-organizacao.component';
import { TorneioCreateRoleOrganizacaoComponent } from './pages/torneio/torneio-create-role-organizacao/torneio-create-role-organizacao.component';
import { TorneioEditRoleOrganizacaoComponent } from './pages/torneio/torneio-edit-role-organizacao/torneio-edit-role-organizacao.component';
import { EquipeEditRoleJogadorComponent } from './pages/equipe/equipe-edit-role-jogador/equipe-edit-role-jogador.component';
import { PerfilEditRoleJogadorComponent } from './pages/perfil/perfil-edit-role-jogador/perfil-edit-role-jogador.component';
import { SuporteCreateRoleJogadorComponent } from './pages/suporte/suporte-create-role-jogador/suporte-create-role-jogador.component';
import { PerfilCreateRoleJogadorComponent } from './pages/perfil/perfil-create-role-jogador/perfil-create-role-jogador.component';
import { TorneioInsertJogadorRoleJogadorComponent } from './pages/torneio/torneio-insert-jogador-role-jogador/torneio-insert-jogador-role-jogador.component';
import { TorneioInsertEquipeComponent } from './pages/torneio/torneio-insert-equipe/torneio-insert-equipe.component';
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
import { EquipeInsertComponent } from './pages/equipe/equipe-insert/equipe-insert.component';
import { TorneioInsertJogadorComponent } from './pages/torneio/torneio-insert-jogador/torneio-insert-jogador.component';
import { EquipeInsertRoleJogadorComponent } from './pages/equipe/equipe-insert-role-jogador/equipe-insert-role-jogador.component';
import { TorneioInsertEquipeRoleJogadorComponent } from './pages/torneio/torneio-insert-equipe-role-jogador/torneio-insert-equipe-role-jogador.component';import { JogadorEditRoleJogadorComponent } from './pages/jogador/jogador-edit-role-jogador/jogador-edit-role-jogador.component';
import { FuncionarioCreateRoleOrganizacaoComponent } from './pages/funcionario/funcionario-create-role-organizacao/funcionario-create-role-organizacao.component';
import { JogadorCreateOpenComponent } from './pages/jogador/jogador-create-open/jogador-create-open.component';
const routes: Routes = [
  
  {path: 'jogador/register', component: JogadorCreateOpenComponent},
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
        {path: ':id/edit', component: EquipeEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
        {path:'edit-role-jogador', component: EquipeEditRoleJogadorComponent,canActivate: [RoleGuard], data: {role: [Role.Jogador]}},
        {path:'inserir-jogador', component: EquipeInsertComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
        {path:'inserir-jogador-role-jogador', component: EquipeInsertRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
    ]},
  
    {path: 'jogador',  children
    :[
      {path: '', component: JogadorComponent},
      {path: 'jogador/create', component: JogadorCreateComponent},
      {path: ':id/edit', component: JogadorEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: 'edit-role-jogador', component: JogadorEditRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Jogador]}},
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
      {path: 'create-role-jogador', component: PerfilCreateRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
      {path: ':id/edit', component: PerfilEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: 'edit-role-jogador', component: PerfilEditRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Jogador]}},
    ]},

    {path: 'torneio',  children
    :[
      {path: '', component: TorneiosComponent},
      {path: 'create', component: TorneioCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: 'create-role-organizacao', component: TorneioCreateRoleOrganizacaoComponent, canActivate: [RoleGuard], data: {role: [Role.Organizacao]}},
      {path: ':id/edit', component: TorneioEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: 'gerar-partidas', component: TorneioPartidaComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path: 'edit-role-organizacao', component: TorneioEditRoleOrganizacaoComponent, canActivate: [RoleGuard], data: {role: [Role.Organizacao, Role.Organizacao]}},
      {path:'inserir-jogador', component: TorneioInsertJogadorComponent,canActivate: [RoleGuard], data: {role: [Role.Admin]}},
      {path:'inserir-equipe', component: TorneioInsertEquipeComponent,canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},
      {path:'inserir-jogador-role-jogador', component: TorneioInsertJogadorRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
      {path:'inserir-equipe-role-jogador', component: TorneioInsertEquipeRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
    ]},
  
    {path: 'organizacao', children
    : [
        {path: '', component: OrganizacaoComponent},
        {path:'create', component: OrganizacaoCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
        {path: ':id/edit', component: OrganizacaoEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},
        {path: 'edit-role-organizacao', component: OrganizacaoEditRoleOrganizacaoComponent, canActivate: [RoleGuard], data: {role: [Role.Organizacao]}},
    ]},
  
    {path: 'funcionario', children
    : [
        {path: '', component: FuncionarioComponent},
        {path:'create', component: FuncionarioCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin]}},
        {path:'create-role-organizacao', component: FuncionarioCreateRoleOrganizacaoComponent, canActivate: [RoleGuard], data: {role: [Role.Organizacao]}},
        {path:':id/edit', component: FuncionarioEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao]}},
        {path:'edit-role-organizacao', component: FuncionarioEditRoleOrganizacaoComponent, canActivate: [RoleGuard], data: {role: [Role.Organizacao]}},
    ]},

    {path: 'suporte', children
    : [
        {path: '', component: SuporteComponent},
        {path:'create', component: SuporteCreateComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
        {path: ':id/edit', component: SuporteEditComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Organizacao, Role.Funcionario]}},
        {path:'create-role-jogador', component: SuporteCreateRoleJogadorComponent, canActivate: [RoleGuard], data: {role: [Role.Admin, Role.Jogador]}},
    ]},
  ]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
