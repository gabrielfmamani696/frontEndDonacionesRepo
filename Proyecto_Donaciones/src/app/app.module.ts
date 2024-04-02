import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormVoluntariosComponent } from './pages/form-voluntarios/form-voluntarios.component';
import { FormDonacionesComponent } from './pages/form-donaciones/form-donaciones.component';
import { FormRepOrgBeneficaComponent } from './pages/form-rep-org-benefica/form-rep-org-benefica.component';
import { FormRepOrgReceptoraComponent } from './pages/form-rep-org-receptora/form-rep-org-receptora.component';
import { HomePrincipalComponent } from './pages/home-principal/home-principal.component';
import { DatosVoluntarioComponent } from './pages/datos-voluntario/datos-voluntario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLoginUsuarioComponent } from './auth/form-login-usuario/form-login-usuario.component';
import { FormSolicitudUsuarioComponent } from './pages/form-solicitud-usuario/form-solicitud-usuario.component';
import { DatosUsuarioComponent } from './pages/datos-usuario/datos-usuario.component';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule, } from '@angular/common/http';
import { PaginaAdminComponent } from './pages/pagina-admin/pagina-admin.component';


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
    PaginaAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
