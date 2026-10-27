import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LANGUAGES, LanguageService } from '../services/language/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  links = [
    { labelKey: 'nav.home', path: '/home' },
    { labelKey: 'nav.about', path: '/about' },
    { labelKey: 'nav.menu', path: '/menu' },
    { labelKey: 'nav.testimonials', path: '/comment' }
  ];

  languages = LANGUAGES;
  activeLang$: Observable<string>;

  scrolled = false;
  menuOpen = false;
  onHome = this.isHome(window.location.pathname);

  private subscription?: Subscription;

  constructor(
    private router: Router,
    private transloco: TranslocoService,
    private languageService: LanguageService
  ) {
    this.activeLang$ = this.transloco.langChanges$;
  }

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

  setLanguage(lang: string) {
    this.languageService.set(lang);
  }

  close() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  private isHome(url: string): boolean {
    return /^\/(home)?([?#].*)?$/.test(url);
  }
}
