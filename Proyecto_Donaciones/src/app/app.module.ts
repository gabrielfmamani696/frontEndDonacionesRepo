import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormVoluntariosComponent } from './form-voluntarios/form-voluntarios.component';
import { FormDonacionesComponent } from './form-donaciones/form-donaciones.component';
import { FormRepOrgBeneficaComponent } from './form-rep-org-benefica/form-rep-org-benefica.component';
import { FormRepOrgReceptoraComponent } from './form-rep-org-receptora/form-rep-org-receptora.component';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { DatosVoluntarioComponent } from './datos-voluntario/datos-voluntario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormVoluntariosComponent,
    FormDonacionesComponent,
    FormRepOrgBeneficaComponent,
    FormRepOrgReceptoraComponent,
    HomePrincipalComponent,
    DatosVoluntarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
