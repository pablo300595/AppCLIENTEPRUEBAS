import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormularioRegistroAlumnoComponent } from './components/formulario-registro-alumno/formulario-registro-alumno.component';
import { CargaDocumentosComponent } from './components/carga-documentos/carga-documentos.component';
import { HomeInscripcionesComponent } from './components/home-inscripciones/home-inscripciones.component';

// modulos
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleAlumnoComponent } from './components/detalle-alumno/detalle-alumno.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { Subject } from 'rxjs';

// servicios
import { MenuService } from './services/menu.service';
import { LoginService } from './services/login.service';
import { AlumnoService } from './services/alumno.service';
import { FileService } from './services/file.service';

// Librerias
import { FileSelectDirective } from 'ng2-file-upload';
import { InscripcionWizardComponent } from './components/inscripcion-wizard/inscripcion-wizard.component';

// Material
import { MaterialModule } from './material';
import { SuccessWizardComponent } from './components/success-wizard/success-wizard.component';

const appRoutes: Routes = [
  {path: 'formularioDatos', component: FormularioRegistroAlumnoComponent},
  {path: 'cargaDocumentos', component: CargaDocumentosComponent},
  {path: '', component: HomeInscripcionesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detalleAlumno', component: DetalleAlumnoComponent },
  {path: 'perfil', component: PerfilComponent},
  {path: 'wizard', component: InscripcionWizardComponent},
  {path: 'wizard-success', component: SuccessWizardComponent}
    ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FormularioRegistroAlumnoComponent,
    CargaDocumentosComponent,
    HomeInscripcionesComponent,
    DetalleAlumnoComponent,
    LoginComponent,
    PerfilComponent,
    FileSelectDirective,
    InscripcionWizardComponent,
    SuccessWizardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MenuService, AlumnoService, LoginService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
