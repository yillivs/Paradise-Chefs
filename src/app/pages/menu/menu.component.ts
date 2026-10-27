import { Component, HostListener } from '@angular/core';

interface Dish {
  name: string;
  detail?: string;
}

interface Category {
  id: string;
  name: string;
  photo: string;
  photoAlt: string;
  caption: string;
  dishes: Dish[];
}

interface Photo {
  src: string;
  alt: string;
  caption: string;
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
      name: 'Appetizers',
      photo: 'assets/menu/appetizers.jpg',
      photoAlt: 'Asian-inspired appetizers served on spoons',
      caption: 'Asian-inspired appetizers.',
      dishes: [
        { name: 'Quesadillas', detail: 'Chipotle flavored chicken, pico de gallo, and guacamole' },
        { name: 'Shrimp cocktail', detail: 'Classic horseradish cocktail sauce' },
        { name: 'New Orleans style shrimp rémoulade', detail: 'Served on a mixed raw veggie salad' },
        { name: 'Indonesian chicken saté skewers', detail: 'Peanut sauce' },
        { name: 'Fresh or crispy spring rolls', detail: 'Sushi maki and dipping sauces' },
        { name: 'Seared ahi tuna', detail: 'Wasabi and soy sauce' }
      ]
    },
    {
      id: 'soups',
      name: 'Soups',
      photo: 'assets/menu/soups.jpg',
      photoAlt: 'A bowl of red pozole topped with cheese, radish and cilantro',
      caption: 'Red pozole with fresh toppings.',
      dishes: [
        { name: 'French onion soup' },
        { name: 'Thai coconut-lemongrass chicken soup' },
        { name: 'Creole gumbo', detail: 'Chicken and seafood' },
        { name: 'Sopa negra', detail: 'Costa Rican black bean soup served with avocado, egg, and cheese toppings' }
      ]
    },
    {
      id: 'salads',
      name: 'Salads',
      photo: 'assets/menu/salads.jpg',
      photoAlt: 'Garden salad in a lettuce cup with cherry tomatoes and cucumber',
      caption: 'Garden salad reception starter.',
      dishes: [
        { name: 'Caesar salad', detail: 'Herbed croutons, with optional grilled chicken or fish addition' },
        { name: 'Frisée salad', detail: 'Bacon pieces, cheese, vinaigrette and toasted nuts' },
        { name: 'Mixed tossed salads', detail: 'Balsamic vinaigrette, buttermilk ranch, French, honey mustard, or green goddess' }
      ]
    },
    {
      id: 'mains',
      name: 'Main Courses',
      photo: 'assets/menu/mains.jpg',
      photoAlt: 'Sliced coffee crusted pork tenderloin',
      caption: 'Coffee crusted pork tenderloin.',
      dishes: [
        { name: 'Grilled tenderloin steak', detail: 'Choice of green peppercorn, red wine and shallot, mushroom sherry, or béarnaise sauce' },
        { name: 'Grilled mahi mahi fillet, tuna steak, jumbo shrimp or lobster tail', detail: 'Cooked in varying combinations' },
        { name: 'Hungarian chicken paprika or Indian chicken masala' },
        { name: 'Lemon-rosemary chicken' },
        { name: 'Pork tenderloin', detail: 'White wine and fennel sauce' }
      ]
    },
    {
      id: 'pasta',
      name: 'Pasta',
      photo: 'assets/menu/pasta.jpg',
      photoAlt: 'A spread of party foods on a long table',
      caption: 'Bespoke party foods for small and large gatherings.',
      dishes: [
        { name: 'Spaghetti, fettuccini, or penne', detail: 'White sauce (Alfredo) or tomato (Marinara) sauce, with optional meat or seafood additions' },
        { name: 'Vegetarian or meat lasagna' }
      ]
    },
    {
      id: 'sides',
      name: 'Side Dishes',
      photo: 'assets/menu/sides.jpg',
      photoAlt: 'A table of appetizers, steamed rice and pickled avocado',
      caption: 'Bespoke party foods for small and large gatherings.',
      dishes: [
        { name: 'Twice baked or scalloped potatoes' },
        { name: 'Steamed rice' },
        { name: 'Orzo with mint' },
        { name: 'Couscous with vegetables' },
        { name: 'Steamed or sautéed vegetables', detail: 'Of the season' }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      photo: 'assets/menu/desserts.jpg',
      photoAlt: 'A platter of tropical fruit',
      caption: 'Tropical fruit platter.',
      dishes: [
        { name: 'Bananas flambée', detail: 'With rum and ice cream' },
        { name: 'Tres leches' },
        { name: 'Tropical fruit salad', detail: 'With ice cream' },
        { name: 'Pies, cheesecake, and cakes', detail: 'Available upon request for special occasions' }
      ]
    }
  ];

  photos: Photo[] = [
    { src: 'assets/menu/appetizers.jpg', alt: 'Asian-inspired appetizers on spoons', caption: 'Asian-inspired appetizers.' },
    { src: 'assets/menu/lettuce-wraps.jpg', alt: 'Lettuce wraps', caption: 'Lettuce wraps.' },
    { src: 'assets/menu/soups.jpg', alt: 'Red pozole', caption: 'Red pozole with fresh toppings.' },
    { src: 'assets/menu/salads.jpg', alt: 'Garden salad', caption: 'Garden salad reception starter.' },
    { src: 'assets/menu/mains.jpg', alt: 'Coffee crusted pork tenderloin', caption: 'Coffee crusted pork tenderloin.' },
    { src: 'assets/menu/caprese.jpg', alt: 'Tomato and mozzarella salad', caption: 'Tomato, basil and mozzarella.' },
    { src: 'assets/menu/bocas-2.jpg', alt: 'Appetizer spoons on a banana leaf', caption: 'Appetizers on banana leaf.' },
    { src: 'assets/menu/sides.jpg', alt: 'A table of party foods', caption: 'Bespoke party foods for small and large gatherings.' },
    { src: 'assets/menu/desserts.jpg', alt: 'Tropical fruit platter', caption: 'Tropical fruit platter to start the day.' }
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
