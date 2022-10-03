import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FavoritoResolver } from './resolves/favorito.resolver';
import { FavoritosResolver } from './resolves/favoritos.resolver';
import { GeolocationResolver } from './resolves/geolocation.resolver';
import { ProdutoResolver } from './resolves/produto.resolver';
import { UsuarioResolver } from './resolves/usuario.resolver';
import { VisualizarProdutoResolver } from './resolves/visualizar-produto.resolver';
import { ObsComponent } from './teste/obs/obs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'cad-item',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cad-item/cad-item.module').then(m => m.CadItemPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    pathMatch: 'full',
    resolve: {produtos: ProdutoResolver}
  },
  {
    path: 'filtro',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/filtro/filtro.module').then(m => m.FiltroPageModule)
  },
  {
    path: 'visualizar-produto/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/visualizar-produto/visualizar-produto.module').then(m => m.VisualizarProdutoPageModule),
    resolve: 
      {produto: VisualizarProdutoResolver, favorito: FavoritoResolver},
    
  },
  {
    path: 'favoritos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule),
    resolve: {favoritos: FavoritosResolver}
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./pages/carrinho/carrinho.module').then( m => m.CarrinhoPageModule)
  },
  {
    path: 'venda',
    loadChildren: () => import('./pages/venda/venda.module').then( m => m.VendaPageModule)
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./pages/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'teste',
    component: ObsComponent
  },
  {
    path: 'enderecos',
    loadChildren: () => import('./pages/enderecos/enderecos.module').then( m => m.EnderecosPageModule),
    resolve: {usuario: UsuarioResolver, geolocation: GeolocationResolver}
  },
  {
    path: 'info-conta',
    loadChildren: () => import('./pages/pages-perfil/info-conta/info-conta.module').then( m => m.InfoContaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
