import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
  MatInputModule, MatSnackBarModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule
],
  exports: [MatButtonModule, MatCheckboxModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule
],
})
export class MaterialModule { }
