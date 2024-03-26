import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormVoluntariosComponent } from './form-voluntarios/form-voluntarios.component';
import { FormDonacionesComponent } from './form-donaciones/form-donaciones.component';
import { FormRepOrgBeneficaComponent } from './form-rep-org-benefica/form-rep-org-benefica.component';
import { FormRepOrgReceptoraComponent } from './form-rep-org-receptora/form-rep-org-receptora.component';
import { HomePrincipalComponent } from './home-principal/home-principal.component';

const routes: Routes = [
  {path: '', component: HomePrincipalComponent},
  {path: 'voluntarios', component: FormVoluntariosComponent},
  {path: 'donaciones', component: FormDonacionesComponent},
  {path: 'reporgbenefica', component: FormRepOrgBeneficaComponent},
  {path: 'reporgreceptora', component: FormRepOrgReceptoraComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
