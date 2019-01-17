import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatStepperModule],
  exports: [MatButtonModule, MatCheckboxModule, MatStepperModule],
})
export class MaterialModule { }
