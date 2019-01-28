import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
  MatInputModule, MatSnackBarModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, MatTooltipModule
],
  exports: [MatButtonModule, MatCheckboxModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, MatTooltipModule
],
})
export class MaterialModule { }
