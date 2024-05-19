import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrl: './profile-viewer.component.scss'
})
export class ProfileViewerComponent {

  @Input() currentUser?: User;

}
