import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from '../../../shared/models/Message';

@Component({
  selector: 'app-message-writer',
  templateUrl: './message-writer.component.html',
  styleUrl: './message-writer.component.scss'
})
export class MessageWriterComponent {
  @Output() messageSent: EventEmitter<string> = new EventEmitter();

  messageForm = new FormGroup({
    messageText: new FormControl<string>('')
  })

  onSend() {
    let messageText = this.messageForm.get('messageText')?.value as string;
    console.log(`Message text: ${messageText}`);
    if (messageText !== '') {
      this.messageSent.emit(messageText);
      this.messageForm.reset();
    }
  }

}
