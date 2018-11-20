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
import { FormsModule } from '@angular/forms';
import { DetalleAlumnoComponent } from './components/detalle-alumno/detalle-alumno.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';

// import { Subject } from 'rxjs';

// servicios
import { MenuService } from './services/menu.service';
import { LoginService } from './services/login.service';
import { AlumnoService } from './services/alumno.service';
import { FileService } from './services/file.service';

const appRoutes: Routes = [
  {path: 'formularioDatos', component: FormularioRegistroAlumnoComponent},
  {path: 'cargaDocumentos', component: CargaDocumentosComponent},
  {path: '', component: HomeInscripcionesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detalleAlumno', component: DetalleAlumnoComponent },
  {path: 'perfil', component: PerfilComponent}
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
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MenuService, AlumnoService, LoginService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
