import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminpanelComponent } from 'src/app/Components/adminpanel/adminpanel.component';
import { MainDashboardComponent } from 'src/app/Components/adminpanel/dashboards/main-dashboard/main-dashboard.component';
import { UsersDashboardComponent } from 'src/app/Components/adminpanel/dashboards/users-dashboard/users-dashboard.component';
import { HighlightsDashboardComponent } from 'src/app/Components/adminpanel/dashboards/highlights-dashboard/highlights-dashboard.component';
import { HighlightEditComponent } from 'src/app/Components/adminpanel/dashboards/highlights-dashboard/highlight-edit/highlight-edit.component';
import { HighlightsListComponent } from 'src/app/Components/adminpanel/dashboards/highlights-dashboard/highlights-list/highlights-list.component';
import { EventsDashboardComponent } from 'src/app/Components/adminpanel/dashboards/events-dashboard/events-dashboard.component';
import { NewsfeedDashboardComponent } from 'src/app/Components/adminpanel/dashboards/newsfeed-dashboard/newsfeed-dashboard.component';
import { ArticlesListComponent } from 'src/app/Components/adminpanel/dashboards/newsfeed-dashboard/articles-list/articles-list.component';
import { ArticleEditComponent } from 'src/app/Components/adminpanel/dashboards/newsfeed-dashboard/article-edit/article-edit.component';

export const router = [
    { path: '', component: AdminpanelComponent, children: [
        { path: '', component: MainDashboardComponent},
        { path: 'users', component: UsersDashboardComponent},
        { path: 'highlights', component: HighlightsDashboardComponent, children:[
            { path: '', component: HighlightsListComponent},
            { path: 'create', component: HighlightEditComponent},
            { path: 'edit/:id', component: HighlightEditComponent},
        ]},
        { path: 'news-feed', component: NewsfeedDashboardComponent, children:[
            { path: '', redirectTo:'./all', pathMatch:'full'},
            { path: 'all', component: ArticlesListComponent},
            { path: 'create', component: ArticleEditComponent},
            { path: 'edit/:id', component: ArticleEditComponent},
        ]},
        { path: 'events', component: EventsDashboardComponent},
    ]},
    //{ path: '**', redirectTo: '/' },
    //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const AdminpanelRoutesModule: ModuleWithProviders = RouterModule.forChild(router);
