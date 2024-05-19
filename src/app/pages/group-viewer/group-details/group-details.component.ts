import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Group } from '../../../shared/models/Group';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export class GroupDetailsComponent implements OnChanges {

  @Input() group?: Group;
  startDate?: string;

  ngOnChanges(): void {
    if (this.group) {
      this.startDate = new Date(this.group?.eventDate as number).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false});
    }
  }

}
