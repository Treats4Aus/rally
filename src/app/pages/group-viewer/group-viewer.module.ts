import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { GroupViewerRoutingModule } from './group-viewer-routing.module';
import { GroupViewerComponent } from './group-viewer.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupMessagesComponent } from './group-messages/group-messages.component';
import { MessageWriterComponent } from './message-writer/message-writer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ApplicationPipesModule } from '../../shared/application-pipes/application-pipes.module';


@NgModule({
  declarations: [
    GroupViewerComponent,
    GroupDetailsComponent,
    GroupMessagesComponent,
    MessageWriterComponent
  ],
  imports: [
    CommonModule,
    GroupViewerRoutingModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    ApplicationPipesModule
  ]
})
export class GroupViewerModule { }
