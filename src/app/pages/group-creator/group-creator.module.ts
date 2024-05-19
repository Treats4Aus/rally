import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupCreatorRoutingModule } from './group-creator-routing.module';
import { GroupCreatorComponent } from './group-creator.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    GroupCreatorComponent
  ],
  imports: [
    CommonModule,
    GroupCreatorRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule
  ]
})
export class GroupCreatorModule { }
