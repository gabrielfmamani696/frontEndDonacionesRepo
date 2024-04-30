import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormVoluntariosComponent } from './pages/formularios_solicitudes/form-voluntarios/form-voluntarios.component';
import { FormDonacionesComponent } from './pages/formularios_solicitudes/form-donaciones/form-donaciones.component';
import { FormRepOrgBeneficaComponent } from './pages/formularios_solicitudes/form-rep-org-benefica/form-rep-org-benefica.component';
import { FormRepOrgReceptoraComponent } from './pages/formularios_solicitudes/form-rep-org-receptora/form-rep-org-receptora.component';
import { HomePrincipalComponent } from './pages/home-principal/home-principal.component';
import { DatosVoluntarioComponent } from './pages/datos/datos-voluntario/datos-voluntario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLoginUsuarioComponent } from './auth/form-login-usuario/form-login-usuario.component';
import { FormSolicitudUsuarioComponent } from './pages/formularios_solicitudes/form-solicitud-usuario/form-solicitud-usuario.component';
import { DatosUsuarioComponent } from './pages/datos/datos-usuario/datos-usuario.component';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule, } from '@angular/common/http';
import { PaginaAdminComponent } from './pages/pagina-admin/pagina-admin.component';
import { FormReceptoresComponent } from './pages/formularios_solicitudes/form-receptores/form-receptores.component';
import { PageVoluntarioComponent } from './pages/page-voluntario/page-voluntario.component';
import { PageDonadorComponent } from './pages/page-donador/page-donador.component';
import { PageBeneficiarioComponent } from './pages/page-beneficiario/page-beneficiario.component';
import { PageVoluntarioColaboradorComponent } from './pages/page-voluntario-colaborador/page-voluntario-colaborador.component';
import { DatosDonacionesComponent } from './pages/datos/datos-donaciones/datos-donaciones.component';
import { DatosDonadoresComponent } from './pages/datos/datos-donadores/datos-donadores.component';
import { DatosReceptoresComponent } from './pages/datos/datos-receptores/datos-receptores.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    AppComponent,
    FormVoluntariosComponent,
    FormDonacionesComponent,
    FormRepOrgBeneficaComponent,
    FormRepOrgReceptoraComponent,
    HomePrincipalComponent,
    DatosVoluntarioComponent,
    FormLoginUsuarioComponent,
    FormSolicitudUsuarioComponent,
    DatosUsuarioComponent,
    NavComponent,
    PaginaAdminComponent,
    FormReceptoresComponent,
    PageVoluntarioComponent,
    PageDonadorComponent,
    PageBeneficiarioComponent,
    PageVoluntarioColaboradorComponent,
    DatosDonacionesComponent,
    DatosDonadoresComponent,
    DatosReceptoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
