import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
  MatInputModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule],
})
export class MaterialModule { }
