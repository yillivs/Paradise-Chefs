import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Fades an element in once it scrolls into view.
 * Optional value is a delay in milliseconds, e.g. appReveal="150".
 * The .reveal / .is-visible styles live in styles.css.
 */
@Directive({
  selector: '[appReveal]'
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal = '';

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    const node = this.el.nativeElement;
    node.classList.add('reveal');

    const delay = Number(this.appReveal);
    if (delay > 0) {
      node.style.transitionDelay = `${delay}ms`;
    }

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        this.observer?.disconnect();
      }
    }, { threshold: 0.15 });
    this.observer.observe(node);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
