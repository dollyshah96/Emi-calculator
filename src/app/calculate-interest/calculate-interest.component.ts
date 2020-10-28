import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';
import { ICalculateInterest } from './models/calculate-interest.model';

@Component({
  selector: 'app-calculate-interest',
  templateUrl: './calculate-interest.component.html',
  styleUrls: ['./calculate-interest.component.scss']
})
export class CalculateInterestComponent implements OnInit {
  public calculatedInfo: ICalculateInterest = new ICalculateInterest();

  public calculateInterestForm: FormGroup = new FormGroup({
    loanAmount: new FormControl(100000, [
      Validators.max(10000000),
      Validators.min(100000),
      Validators.required
    ]),

    tenure: new FormControl(1, [
      Validators.max(30),
      Validators.min(1),
      Validators.required
    ]),

    rateOfInterest: new FormControl(6, [
      Validators.max(15),
      Validators.min(0),
      Validators.required
    ])
  });

  constructor() { }

  ngOnInit(): void {
    this.calculateRateOfInterest();
    this.detectFormChanges();
  }

  public sliderChange(sliderEvent: MatSlider, type: string) {
    if (type == 'loan') {
      this.calculateInterestForm.controls.loanAmount.setValue(sliderEvent.value);
    }

    if (type == 'tenure') {
      this.calculateInterestForm.controls.tenure.setValue(sliderEvent.value);
    }

    if (type == 'interest') {
      this.calculateInterestForm.controls.rateOfInterest.setValue(sliderEvent.value);
    }
  }


  private calculateRateOfInterest() {
    //this.calculateInterestForm.valid is not working here!

    const isFormValid = this.calculateInterestForm.get('loanAmount').valid &&
      this.calculateInterestForm.get('tenure').valid
      && this.calculateInterestForm.get('rateOfInterest').valid

    if (isFormValid) {
      //A = P(1+rt) where r = R/100;

      const r = this.calculateInterestForm.controls.rateOfInterest.value / 100;
      const totalAmount = this.calculateInterestForm.controls.loanAmount.value * (1 + r * this.calculateInterestForm.controls.tenure.value);
      const interest = totalAmount - this.calculateInterestForm.controls.loanAmount.value;
      this.calculatedInfo.interestAmount = interest;
      this.calculatedInfo.totalAmount = totalAmount;
      this.calculatedInfo.principalAmount = this.calculateInterestForm.controls.loanAmount.value;
      this.calculateEMI();
    }

  }


  private calculateEMI() {
    //EMI = (P*r* [(1+r)^n) / ((1+r)^n - 1)]) where r=r/12*100;

    const tenureInMonths = this.calculateInterestForm.controls.tenure.value * 12;
    const rateOfInterestPerYear = this.calculateInterestForm.controls.rateOfInterest.value / (12 * 100);
    const P = this.calculateInterestForm.controls.loanAmount.value;
    const EMI = P * rateOfInterestPerYear * (Math.pow((1 + rateOfInterestPerYear), tenureInMonths)) /
      (Math.pow((1 + rateOfInterestPerYear), tenureInMonths) - 1);

    this.calculatedInfo.EMI = Math.round(EMI);
  }

  public detectFormChanges() {

    this.calculateInterestForm.controls.loanAmount.valueChanges.subscribe(() => {
      this.calculateRateOfInterest();
    });

    this.calculateInterestForm.controls.tenure.valueChanges.subscribe(() => {
      this.calculateRateOfInterest();
    });

    this.calculateInterestForm.controls.rateOfInterest.valueChanges.subscribe(() => {
      this.calculateRateOfInterest();
    });
  }

  public onlyNumbers(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = event.code;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
