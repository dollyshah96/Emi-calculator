import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculateInterestComponent } from './calculate-interest.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  {
    path: '',
    component: CalculateInterestComponent
  }
]

@NgModule({
  declarations: [CalculateInterestComponent],
  imports: [
    CommonModule,
    MaterialModule,
    // MatSliderModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class CalculateInterestModule { }
