import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormularioRegistroAlumnoComponent } from './components/formulario-registro-alumno/formulario-registro-alumno.component';
import { CargaDocumentosComponent } from './components/carga-documentos/carga-documentos.component';
import { HomeInscripcionesComponent } from './components/home-inscripciones/home-inscripciones.component';
import { InscripcionWizardComponent } from './components/inscripcion-wizard/inscripcion-wizard.component';
import { DetalleAlumnoComponent } from './components/detalle-alumno/detalle-alumno.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { SuccessWizardComponent } from './components/success-wizard/success-wizard.component';
import { FooterComponent } from './components/footer/footer.component';

// modulos de angular
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// servicios
import { MenuService } from './services/menu.service';
import { LoginService } from './services/login.service';
import { AlumnoService } from './services/alumno.service';
import { FileService } from './services/file.service';
import { WizardService } from './services/wizard.service';
import { FormularioRegistroService } from './services/formulario-registro.service';

// Angular material
import { MaterialModule } from './material';

// Angular cdk
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

// ng2
import { FileSelectDirective } from 'ng2-file-upload';

const appRoutes: Routes = [
  {path: 'formularioDatos', component: FormularioRegistroAlumnoComponent},
  {path: 'cargaDocumentos', component: CargaDocumentosComponent},
  {path: '', component: HomeInscripcionesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detalleAlumno', component: DetalleAlumnoComponent },
  {path: 'perfil', component: PerfilComponent},
  {path: 'wizard', component: InscripcionWizardComponent},
  {path: 'wizard-success', component: SuccessWizardComponent},
  {path: 'contrato', component: ContratoComponent}
];

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, MenuComponent, FormularioRegistroAlumnoComponent,
    CargaDocumentosComponent, HomeInscripcionesComponent, DetalleAlumnoComponent,
    LoginComponent, PerfilComponent, FileSelectDirective, InscripcionWizardComponent,
    SuccessWizardComponent, FooterComponent, ContratoComponent, ConfirmacionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MenuService, AlumnoService, LoginService, FileService,
    WizardService, FormularioRegistroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
