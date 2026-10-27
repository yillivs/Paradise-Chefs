import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, provideTransloco } from '@ngneat/transloco';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './core/header/header.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MenuComponent } from './pages/menu/menu.component';
import { CommentComponent } from './pages/comment/comment.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { RevealDirective } from './shared/reveal.directive';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    CommentComponent,
    GalleryComponent,
    RevealDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslocoModule
  ],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        // Anything not yet translated shows the English text
        missingHandler: { useFallbackTranslation: true }
      },
      loader: TranslocoHttpLoader
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
