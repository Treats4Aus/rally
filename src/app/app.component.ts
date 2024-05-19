import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  page = '';
  title = 'Rally';
  currentUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    let routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }

  toggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  closeSidenav(event: boolean, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(event?: boolean) {
    if (event === undefined || event === true) {
      this.authService.signout().catch(error => console.error(error));
    }
  }

}
