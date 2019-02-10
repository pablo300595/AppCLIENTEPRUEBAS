import { Component, OnInit } from '@angular/core';
import { ContratoService } from './../../services/contrato.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {
  acceptedTerms: boolean;

  constructor(private contratoService: ContratoService) {
    this.contratoService.currentAcceptedTerms.subscribe(accepted => this.acceptedTerms = accepted);
  }

  ngOnInit() {
  }

  onChange(event) {
    console.log('onChange event.checked ' + event.checked);
    this.contratoService.changeAcceptedTerms(event.checked);
  }

}
