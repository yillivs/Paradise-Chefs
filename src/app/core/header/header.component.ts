import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  links = [
    { label: 'Home', path: '/home' },
    { label: 'About Us', path: '/about' },
    { label: 'Menu', path: '/menu' },
    { label: 'Testimonials', path: '/comment' }
  ];

  scrolled = false;
  menuOpen = false;
  onHome = this.isHome(window.location.pathname);

  private subscription?: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.subscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.onHome = this.isHome(event.urlAfterRedirects);
        this.close();
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    document.body.style.overflow = '';
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 60;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.close();
  }

  toggle() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  close() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  private isHome(url: string): boolean {
    return /^\/(home)?([?#].*)?$/.test(url);
  }
}
