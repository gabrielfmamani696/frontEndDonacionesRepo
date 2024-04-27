import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormVoluntariosComponent } from './pages/formularios_solicitudes/form-voluntarios/form-voluntarios.component';
import { FormDonacionesComponent } from './pages/formularios_solicitudes/form-donaciones/form-donaciones.component';
import { FormRepOrgBeneficaComponent } from './pages/formularios_solicitudes/form-rep-org-benefica/form-rep-org-benefica.component';
import { FormRepOrgReceptoraComponent } from './pages/formularios_solicitudes/form-rep-org-receptora/form-rep-org-receptora.component';
import { HomePrincipalComponent } from './pages/home-principal/home-principal.component';
import { DatosVoluntarioComponent } from './pages/datos/datos-voluntario/datos-voluntario.component';
import { DatosUsuarioComponent } from './pages/datos/datos-usuario/datos-usuario.component';
import { FormLoginUsuarioComponent } from './auth/form-login-usuario/form-login-usuario.component';
import { FormSolicitudUsuarioComponent } from './pages/formularios_solicitudes/form-solicitud-usuario/form-solicitud-usuario.component';
import { PaginaAdminComponent } from './pages/pagina-admin/pagina-admin.component';
import { FormReceptoresComponent } from './pages/formularios_solicitudes/form-receptores/form-receptores.component';
import { PageVoluntarioComponent } from './pages/page-voluntario/page-voluntario.component';
import { PageDonadorComponent } from './pages/page-donador/page-donador.component';
import { PageBeneficiarioComponent } from './pages/page-beneficiario/page-beneficiario.component';
// guards
import { guardAdminGuard } from './guards/guard-admin.guard';
import { PageVoluntarioColaboradorComponent } from './pages/page-voluntario-colaborador/page-voluntario-colaborador.component';
import { DatosDonacionesComponent } from './pages/datos/datos-donaciones/datos-donaciones.component';
import { DatosDonadoresComponent } from './pages/datos/datos-donadores/datos-donadores.component';
import { DatosReceptoresComponent } from './pages/datos/datos-receptores/datos-receptores.component';

const routes: Routes = [
  {path: '', component: HomePrincipalComponent},
  {path: 'solvoluntarios', component: FormVoluntariosComponent},
  {path: 'soldonadores', component: FormDonacionesComponent},
  {path: 'solreceptores', component: FormReceptoresComponent},

  {path: 'reporgbenefica', component: FormRepOrgBeneficaComponent},
  {path: 'reporgreceptora', component: FormRepOrgReceptoraComponent},
  {path: 'datavoluntarios', component: DatosVoluntarioComponent},
  {path: 'datadonadores', component: DatosDonadoresComponent},
  {path: 'datareceptores', component: DatosReceptoresComponent},
  // //////
  {path: 'datausuario', component: DatosUsuarioComponent},
  {path: 'datadonacion', component: DatosDonacionesComponent},
  {path: 'login', component: FormLoginUsuarioComponent},
  {path: 'solicitudusuario', component: FormSolicitudUsuarioComponent},
  {path: 'adminpage', component: PaginaAdminComponent, canActivate: [guardAdminGuard]},
  // 
  {path: 'pagevoluntario', component: PageVoluntarioComponent},
  {path: 'pagevolColab', component: PageVoluntarioColaboradorComponent},
  {path: 'pagedonador', component: PageDonadorComponent},
  {path: 'pagebeneficiario', component: PageBeneficiarioComponent},
  
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
