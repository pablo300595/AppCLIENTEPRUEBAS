import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
  MatInputModule, MatSnackBarModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, MatTooltipModule, MatChipsModule, MatSlideToggleModule
],
  exports: [MatButtonModule, MatCheckboxModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, MatTooltipModule, MatChipsModule, MatSlideToggleModule
],
})
export class MaterialModule { }
