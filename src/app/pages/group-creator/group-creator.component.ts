import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GroupService } from '../../shared/services/group.service';
import { Group } from '../../shared/models/Group';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-creator',
  templateUrl: './group-creator.component.html',
  styleUrl: './group-creator.component.scss'
})
export class GroupCreatorComponent implements OnDestroy {

  userSubscription: Subscription[] = [];
  
  groupForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl<string>(''),
    members: new FormControl<string>(''),
    eventDate: new FormControl<string>('', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}')])
  });
  
  constructor(
    private router: Router, 
    private userService: UserService, 
    private groupService: GroupService, 
    private snackBar: MatSnackBar) { }
  
  onSubmit() {
    if (this.groupForm.valid) {
      let name = this.groupForm.get('name')?.value as string;
      let description = this.groupForm.get('description')?.value as string;
      let members = this.groupForm.get('members')?.value?.split('\n') as string[];
      let eventDate = this.groupForm.get('eventDate')?.value as string;
      console.log(`Name: ${name} Description: ${description} Members: ${members} Date: ${eventDate}`);
      const group: Group = {
        id: '',
        name: name,
        eventDescription: description,
        eventDate: new Date(eventDate).getTime()
      }
      this.groupService.add(group)
      .then(async id => {
        let currentUser = JSON.parse(localStorage.getItem('user') as string);
        await this.groupService.addMembership({userId: currentUser.uid, groupId: id});
        this.userService.getByEmail(members).subscribe(users => {
          console.log(users);
          users.forEach(async user => await this.groupService.addMembership({userId: user.id, groupId: id}));
          this.snackBar.open('Group created successfully', 'Dismiss', {duration: 3000});
          this.router.navigateByUrl(`/groups/${id}`);
        });
      })
      .catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
    } else {
      this.snackBar.open('Not every form field is properly filled', 'Dismiss', {duration: 3000});
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.forEach(sub => sub.unsubscribe());
  }
  
}
