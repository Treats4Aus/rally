import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Message } from '../../../shared/models/Message';
import { UserService } from '../../../shared/services/user.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-group-messages',
  templateUrl: './group-messages.component.html',
  styleUrl: './group-messages.component.scss'
})
export class GroupMessagesComponent implements OnChanges {
  
  @Input() messages: Message[] = [];
  @ViewChild('virtualScroll') virtualScroll?: CdkVirtualScrollViewport;
  currentUser = JSON.parse(localStorage.getItem('user') as string);

  constructor(private userService: UserService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.messages);
    this.messages.forEach(message => {
      this.userService.getById(message.senderId).subscribe(user => {
        message.senderDisplayName = user ? user.username as string : 'Deleted user';
      });
    });
    setTimeout(() => {
      this.virtualScroll?.scrollTo({
        bottom: 0,
        behavior: 'auto',
      });
    }, 0);
    setTimeout(() => {
      this.virtualScroll?.scrollTo({
        bottom: 0,
        behavior: 'auto',
      });
    }, 50);
  }

}
