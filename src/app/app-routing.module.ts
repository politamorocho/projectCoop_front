import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogueoComponent } from './pages/login/logueo/logueo.component';
import { AccesoLoginGuard } from './guards/acceso-login.guard';


const routes: Routes = [
  {
    path:'login', component: LogueoComponent
  },
  {
    path:'', redirectTo:'login/login', pathMatch:'full'
  },
  {
    path:'login', loadChildren:()=>import('./pages/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'shared', loadChildren:()=>import('./pages/shared/shared.module').then(m=>m.SharedModule)
  },
  {
    path:'unidades', loadChildren:()=>import('./pages/unidad/unidad.module').then(m=>m.UnidadModule)
  },
  {
    path:'rutas', loadChildren:()=>import('./pages/rutas/rutas.module').then(m=>m.RutasModule)
  },
  {
    path:'roles', loadChildren:()=>import('./pages/roles/roles.module').then(m=>m.RolesModule)
  },
  {
    path:'usuarios', loadChildren:()=>import('./pages/usuarios/usuarios.module').then(m=>m.UsuariosModule)
  },
  {
    path:'suspensiones', loadChildren:()=>import('./pages/suspensiones/suspensiones.module').then(m=>m.SuspensionesModule),
  },
  {
    path:'turnos', loadChildren:()=>import('./pages/turnos/turnos.module').then(m=>m.TurnosModule)
  },
  {
    path:'reportes', loadChildren:()=>import('./pages/reportes/reportes.module').then(m=>m.ReportesModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
