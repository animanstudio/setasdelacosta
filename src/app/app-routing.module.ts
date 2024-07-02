import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then( m => m.VentasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./pages/proveedores/proveedores.module').then( m => m.ProveedoresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'compras',
    loadChildren: () => import('./pages/compras/compras.module').then( m => m.ComprasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventario',
    loadChildren: () => import('./pages/inventario/inventario.module').then( m => m.InventarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'abonos',
    loadChildren: () => import('./pages/abonos/abonos.module').then( m => m.AbonosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./pages/cuentas/cuentas.module').then( m => m.CuentasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'metricas',
    loadChildren: () => import('./pages/metricas/metricas.module').then( m => m.MetricasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./core/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./core/page/ventas/pedido/pedido.module').then( m => m.PedidoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
