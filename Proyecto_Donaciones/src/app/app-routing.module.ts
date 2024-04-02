import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormVoluntariosComponent } from './pages/form-voluntarios/form-voluntarios.component';
import { FormDonacionesComponent } from './pages/form-donaciones/form-donaciones.component';
import { FormRepOrgBeneficaComponent } from './pages/form-rep-org-benefica/form-rep-org-benefica.component';
import { FormRepOrgReceptoraComponent } from './pages/form-rep-org-receptora/form-rep-org-receptora.component';
import { HomePrincipalComponent } from './pages/home-principal/home-principal.component';
import { DatosVoluntarioComponent } from './pages/datos-voluntario/datos-voluntario.component';
import { DatosUsuarioComponent } from './pages/datos-usuario/datos-usuario.component';
import { FormLoginUsuarioComponent } from './auth/form-login-usuario/form-login-usuario.component';
import { FormSolicitudUsuarioComponent } from './pages/form-solicitud-usuario/form-solicitud-usuario.component';
import { PaginaAdminComponent } from './pages/pagina-admin/pagina-admin.component';

const routes: Routes = [
  {path: '', component: HomePrincipalComponent},
  {path: 'voluntarios', component: FormVoluntariosComponent},
  {path: 'donaciones', component: FormDonacionesComponent},
  {path: 'reporgbenefica', component: FormRepOrgBeneficaComponent},
  {path: 'reporgreceptora', component: FormRepOrgReceptoraComponent},
  {path: 'datavoluntarios', component: DatosVoluntarioComponent},
  // //////
  {path: 'datausuario', component: DatosUsuarioComponent},
  {path: 'login', component: FormLoginUsuarioComponent},
  {path: 'solicitudusuario', component: FormSolicitudUsuarioComponent},
  {path: 'adminpage', component: PaginaAdminComponent},

  
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
