import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsFeedComponent } from 'src/app/Components/news-feed/news-feed.component';

export const router = [
  { path:'news/:id', component: NewsFeedComponent}
  // { path: '**', redirectTo: '/' },
  // { path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const GeneralRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);
