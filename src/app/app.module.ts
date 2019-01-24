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
import { WizardService } from './services/wizard.service';


// import Table with paginator
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';


// Librerias
import { FileSelectDirective } from 'ng2-file-upload';

import { InscripcionWizardComponent } from './components/inscripcion-wizard/inscripcion-wizard.component';

// Material
import { MaterialModule } from './material';
import { SuccessWizardComponent } from './components/success-wizard/success-wizard.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatTabsModule} from '@angular/material/tabs';

import { ContratoComponent } from './components/contrato/contrato.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { ResumenComponent } from './components/resumen/resumen.component';




const appRoutes: Routes = [
  {path: 'formularioDatos', component: FormularioRegistroAlumnoComponent},
  {path: 'cargaDocumentos', component: CargaDocumentosComponent},
  {path: '', component: HomeInscripcionesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detalleAlumno', component: DetalleAlumnoComponent },
  {path: 'perfil', component: PerfilComponent},
  {path: 'wizard', component: InscripcionWizardComponent},
  {path: 'wizard-success', component: SuccessWizardComponent},
  {path: 'contrato', component: ContratoComponent},
  {path: 'resumen', component: ResumenComponent}
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
    SuccessWizardComponent,
    FooterComponent,
    ContratoComponent,
    ConfirmacionComponent,
    ResumenComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    DragDropModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    MatCheckboxModule,
    MatTabsModule

  ],
  providers: [MenuService, AlumnoService, LoginService, FileService, WizardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
