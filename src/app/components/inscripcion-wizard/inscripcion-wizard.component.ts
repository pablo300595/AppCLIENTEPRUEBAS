import { Component, OnInit } from '@angular/core';
import { WizardService } from './../../services/wizard.service';

@Component({
  selector: 'app-inscripcion-wizard',
  templateUrl: './inscripcion-wizard.component.html',
  styleUrls: ['./inscripcion-wizard.component.css']
})
export class InscripcionWizardComponent implements OnInit {
  stepOneCompleted: boolean;
  stepTwoCompleted: boolean;
  stepThreeCompleted: boolean;
  stepFourCompleted: boolean;
  constructor(private wizardService: WizardService) { }

  ngOnInit() {
    this.wizardService.currentStepOne.subscribe(status => this.stepOneCompleted = status);
    this.wizardService.currentStepTwo.subscribe(status => this.stepTwoCompleted = status);
    this.wizardService.currentStepThree.subscribe(status => this.stepThreeCompleted = status);
    this.wizardService.currentStepFour.subscribe(status => this.stepFourCompleted = status);
  }

}
