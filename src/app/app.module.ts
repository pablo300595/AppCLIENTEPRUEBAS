
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

// modulos
import { DetalleAlumnoDialogComponent } from './components/detalle-alumno/detalle-alumno.component';

import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { SuccessWizardComponent } from './components/success-wizard/success-wizard.component';
import { FooterComponent } from './components/footer/footer.component';
// subcomponentes
import { PdfTemplatePhotoComponent } from './components/subcomponents/pdf-template-photo/pdf-template-photo.component';
import { PdfTemplateNssComponent } from './components/subcomponents/pdf-template-nss/pdf-template-nss.component';
import { PdfTemplateComprobanteComponent } from './components/subcomponents/pdf-template-comprobante/pdf-template-comprobante.component';
import { PdfTemplateCurpComponent } from './components/subcomponents/pdf-template-curp/pdf-template-curp.component';
import { PdfTemplateClinicosComponent } from './components/subcomponents/pdf-template-clinicos/pdf-template-clinicos.component';
import { PdfTemplateCertificadoComponent } from './components/subcomponents/pdf-template-certificado/pdf-template-certificado.component';
import { PdfTemplateActaComponent } from './components/subcomponents/pdf-template-acta/pdf-template-acta.component';

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
import { DropzoneTemplatesService } from './services/dropzone-templates.service';

// Angular material
import { MaterialModule } from './material';

// Angular cdk
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

// ng2
import { FileSelectDirective } from 'ng2-file-upload';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';


// Material
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

import {MatNativeDateModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { ResumenComponent } from './components/resumen/resumen.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { TemplateWizardComponent } from './components/subcomponents/template-wizard/template-wizard.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfTemplatePhotoJPGComponent } from './components/subcomponents/pdf-template-photo-jpg/pdf-template-photo-jpg.component';
import { TemplateCorrectComponent } from './components/subcomponents/template-correct/template-correct.component';
import { TemplateIncorrectComponent } from './components/subcomponents/template-incorrect/template-incorrect.component';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { ModalViewComponent } from './components/modal-view/modal-view.component';
import { TemplateLinkDownloadsComponent } from './components/subcomponents/template-link-downloads/template-link-downloads.component';

import { ValidarDocumentosComponent } from './components/validar-documentos/validar-documentos.component';
import { ValidarDocumentosModalComponent} from './components/validar-documentos/validar-documentos.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';

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
  {path: 'resumen', component: ResumenComponent},
  {path: 'validarDocumentos', component: ValidarDocumentosComponent}
];

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   // url: 'http://localhost:3000/upload',
   url: 'https://app-apipruebas.herokuapp.com/upload',
   maxFilesize: 3,
   acceptedFiles: '.pdf',
   createImageThumbnails: true,
   maxThumbnailFilesize: 10,
   thumbnailWidth: 800,
   thumbnailHeight: 800,
   dictDefaultMessage: 'Arrastre los archivos o de click para su carga',
   clickable: false
 };

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, MenuComponent, FormularioRegistroAlumnoComponent,
    CargaDocumentosComponent, HomeInscripcionesComponent, DetalleAlumnoComponent, DetalleAlumnoDialogComponent,
    LoginComponent, PerfilComponent, InscripcionWizardComponent,
    SuccessWizardComponent, FooterComponent, ContratoComponent, ConfirmacionComponent, ResumenComponent,
    PdfTemplatePhotoComponent,
    PdfTemplateNssComponent,
    PdfTemplateComprobanteComponent,
    PdfTemplateCurpComponent,
    PdfTemplateClinicosComponent,
    PdfTemplateCertificadoComponent,
    PdfTemplateActaComponent,
    TemplateWizardComponent,
    PdfTemplatePhotoJPGComponent,
    TemplateCorrectComponent,
    TemplateIncorrectComponent,
    MatConfirmDialogComponent,
    ModalViewComponent,
    TemplateLinkDownloadsComponent,
    ValidarDocumentosComponent,
    ValidarDocumentosModalComponent,
    EditModalComponent
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
    RouterModule.forRoot(appRoutes),
    DropzoneModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    PdfViewerModule
  ],
  entryComponents: [DetalleAlumnoComponent, DetalleAlumnoDialogComponent,
    MatConfirmDialogComponent, ModalViewComponent,ValidarDocumentosModalComponent,
    EditModalComponent],
  providers: [MenuService, AlumnoService, LoginService, FileService,
    WizardService, FormularioRegistroService, DropzoneTemplatesService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
