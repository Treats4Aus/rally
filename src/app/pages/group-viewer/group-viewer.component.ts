import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Message } from '../../shared/models/Message';
import { defaultMessages } from '../../shared/constants/default-messages';
import { Group } from '../../shared/models/Group';
import { GroupService } from '../../shared/services/group.service';
import { MessageService } from '../../shared/services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-group-viewer',
  templateUrl: './group-viewer.component.html',
  styleUrl: './group-viewer.component.scss'
})
export class GroupViewerComponent implements OnInit {

  messages: Message[] = [];
  id?: string;
  currentGroup?: Group;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private groupService: GroupService, 
    private messageService: MessageService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') as string
      this.groupService.getById(this.id).subscribe(group => {
        this.currentGroup = group;
        if (this.currentGroup !== undefined) {
          this.messageService.getByGroup(this.currentGroup.id).subscribe(messages => {
            this.messages = messages;
          });
        }
      });
    });
  }

  storeMessage(text: string) {
    let currentUser = JSON.parse(localStorage.getItem('user') as string);
    let message: Message = {
      groupId: this.currentGroup?.id as string,
      senderId: currentUser.uid,
      sentTimeStamp: new Date().getTime(),
      text: text
    };
    this.messageService.add(message).catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
  }

}
