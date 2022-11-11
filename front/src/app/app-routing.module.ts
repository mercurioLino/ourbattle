import { PageComponent } from './layout/page/page.component';
import { JogadorCreateComponent } from './pages/jogador/jogador-create/jogador-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipeCreateComponent } from './pages/equipes/equipes-create/equipe-create.component';
import { EquipeComponent } from './pages/equipes/equipes/equipe.component';
import { HomeComponent } from './pages/home/home.component';
import { JogadorComponent } from './pages/jogador/jogador/jogador.component';
import { OrganizacoesCreateComponent } from './pages/organizacao/organizacoes-create/organizacoes-create.component';
import { OrganizacoesComponent } from './pages/organizacao/organizacoes/organizacoes.component';
import { TorneiosComponent } from './pages/torneio/torneio/torneio.component';
import { FuncionarioCreateComponent } from './pages/funcionario/funcionario-create/funcionario-create.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario/funcionario.component';
import { TorneioCreateComponent } from './pages/torneio/torneio-create/torneio-create.component';
import { JogoCreateComponent } from './pages/jogo/jogo-create/jogo-create.component';
import { JogoComponent } from './pages/jogo/jogo/jogo.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},

  {path: '', 
  component: PageComponent,
  children: [
    {path:'', component: HomeComponent},

    {path: 'equipe', children
    : [
        {path: '', component: EquipeComponent},
        {path:'create', component: EquipeCreateComponent},
    ]},
  
    {path: 'jogador',  children
    :[
      {path: '', component: JogadorComponent},
      {path: 'create', component: JogadorCreateComponent}
    ]},
  
    {path: 'jogo',  children
    :[
      {path: '', component: JogoComponent},
      {path: 'create', component: JogoCreateComponent}
    ]},
  
  
    {path: 'torneio',  children
    :[
      {path: '', component: TorneiosComponent},
      {path: 'create', component: TorneioCreateComponent}
    ]},
  
    {path: 'organizacoes', children
    : [
        {path: '', component: OrganizacoesComponent},
        {path:'create', component: OrganizacoesCreateComponent},
    ]},
  
    {path: 'funcionario', children
    : [
        {path: '', component: FuncionarioComponent},
        {path:'create', component: FuncionarioCreateComponent},
    ]},
  ]},

  
  


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
