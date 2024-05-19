import { Component, OnInit } from '@angular/core';
import { Group } from '../../shared/models/Group';
import { defaultGroups } from '../../shared/constants/default-groups';
import { Router } from '@angular/router';
import { GroupService } from '../../shared/services/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  myGroups: Group[] = [];
  
  constructor(private router: Router, private groupService: GroupService) { }
  
  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('user') as string);
    console.log(currentUser);
    this.groupService.getMemberships(currentUser.uid).subscribe(memberships => {
      this.myGroups = [];
      memberships.forEach(m => {
        this.groupService.getById(m.groupId).subscribe(group => {
          if (group !== undefined) {
            this.groupService.getMembershipsByGroup(group.id).subscribe(m => {
              group.memberCount = m.length + ((m.length > 1) ? ' members' : ' member');
            });
            this.myGroups.push(group);
          }
        });
      });
    });
  }
  
  groupClicked(id: string) {
    console.log(`Clicked group with id ${id}`);
    this.router.navigateByUrl('/groups/' + id);
  }
  
}
