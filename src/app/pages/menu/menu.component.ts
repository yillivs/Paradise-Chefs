import { Component, HostListener } from '@angular/core';

// Text for every category, dish and photo lives in assets/i18n/<lang>.json
// under menu.categories.<id>, menu.dishes.<key> and menu.photos.<id>.
interface DishRef {
  key: string;
  /** True when the dish has a detail line in the translation file. */
  detail?: boolean;
}

interface Category {
  id: string;
  photo: string;
  dishes: DishRef[];
}

interface Photo {
  id: string;
  src: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  categories: Category[] = [
    {
      id: 'appetizers',
      photo: 'assets/menu/appetizers.jpg',
      dishes: [
        { key: 'quesadillas', detail: true },
        { key: 'shrimpCocktail', detail: true },
        { key: 'nolaShrimp', detail: true },
        { key: 'chickenSate', detail: true },
        { key: 'springRolls', detail: true },
        { key: 'ahiTuna', detail: true }
      ]
    },
    {
      id: 'soups',
      photo: 'assets/menu/soups.jpg',
      dishes: [
        { key: 'frenchOnion' },
        { key: 'thaiSoup' },
        { key: 'gumbo', detail: true },
        { key: 'sopaNegra', detail: true }
      ]
    },
    {
      id: 'salads',
      photo: 'assets/menu/salads.jpg',
      dishes: [
        { key: 'caesar', detail: true },
        { key: 'frisee', detail: true },
        { key: 'mixedSalads', detail: true }
      ]
    },
    {
      id: 'mains',
      photo: 'assets/menu/mains.jpg',
      dishes: [
        { key: 'tenderloinSteak', detail: true },
        { key: 'seafoodGrill', detail: true },
        { key: 'chickenCurries' },
        { key: 'lemonChicken' },
        { key: 'porkTenderloin', detail: true }
      ]
    },
    {
      id: 'pasta',
      photo: 'assets/menu/pasta.jpg',
      dishes: [
        { key: 'pastaSauces', detail: true },
        { key: 'lasagna' }
      ]
    },
    {
      id: 'sides',
      photo: 'assets/menu/sides.jpg',
      dishes: [
        { key: 'potatoes' },
        { key: 'rice' },
        { key: 'orzo' },
        { key: 'couscous' },
        { key: 'vegetables', detail: true }
      ]
    },
    {
      id: 'desserts',
      photo: 'assets/menu/desserts.jpg',
      dishes: [
        { key: 'bananasFlambee', detail: true },
        { key: 'tresLeches' },
        { key: 'fruitSalad', detail: true },
        { key: 'pies', detail: true }
      ]
    }
  ];

  photos: Photo[] = [
    { id: 'appetizers', src: 'assets/menu/appetizers.jpg' },
    { id: 'lettuceWraps', src: 'assets/menu/lettuce-wraps.jpg' },
    { id: 'soups', src: 'assets/menu/soups.jpg' },
    { id: 'salads', src: 'assets/menu/salads.jpg' },
    { id: 'mains', src: 'assets/menu/mains.jpg' },
    { id: 'caprese', src: 'assets/menu/caprese.jpg' },
    { id: 'bocas2', src: 'assets/menu/bocas-2.jpg' },
    { id: 'sides', src: 'assets/menu/sides.jpg' },
    { id: 'desserts', src: 'assets/menu/desserts.jpg' }
  ];

  selected = this.categories[0];
  lightboxIndex: number | null = null;

  select(category: Category) {
    this.selected = category;
  }

  /** Arrow keys move between category tabs. */
  onTabKey(event: KeyboardEvent, index: number) {
    const last = this.categories.length - 1;
    let next = -1;
    if (event.key === 'ArrowRight') {
      next = index === last ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft') {
      next = index === 0 ? last : index - 1;
    }
    if (next >= 0) {
      event.preventDefault();
      this.select(this.categories[next]);
      const tab = document.getElementById('tab-' + this.categories[next].id);
      tab?.focus();
    }
  }

  open(index: number) {
    this.lightboxIndex = index;
  }

  close() {
    this.lightboxIndex = null;
  }

  step(direction: number) {
    if (this.lightboxIndex === null) {
      return;
    }
    const count = this.photos.length;
    this.lightboxIndex = (this.lightboxIndex + direction + count) % count;
  }

  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent) {
    if (this.lightboxIndex === null) {
      return;
    }
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowRight') {
      this.step(1);
    } else if (event.key === 'ArrowLeft') {
      this.step(-1);
    }
  }
}
