import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() currentPage: string = '';
  @Input() currentUser?: firebase.default.User | null;
  @Output() closeSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  close() {
    this.closeSidenav.emit(true);
  }

  logout() {
    this.onLogout.emit(true);
  }

}
