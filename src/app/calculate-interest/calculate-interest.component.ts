import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculate-interest',
  templateUrl: './calculate-interest.component.html',
  styleUrls: ['./calculate-interest.component.scss']
})
export class CalculateInterestComponent implements OnInit {
  public LoanAmount: Number = 100000;

  constructor() { }

  ngOnInit(): void {
  }

}
