import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

export const LANGUAGES = ['en', 'es'];
const STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private transloco: TranslocoService) { }

  /** Saved choice first, then the browser language, then English. */
  init() {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // storage can be blocked; fall through to the browser language
    }
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    const initial = [saved, browser].find(lang => !!lang && LANGUAGES.includes(lang)) || 'en';
    this.apply(initial);
  }

  /** Called when a visitor picks a language, so it is remembered. */
  set(lang: string) {
    if (!LANGUAGES.includes(lang)) {
      return;
    }
    this.apply(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // not being able to remember the choice is fine
    }
  }

  private apply(lang: string) {
    this.transloco.setActiveLang(lang);
    document.documentElement.lang = lang;
  }
}
