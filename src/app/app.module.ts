// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';





// Components
import { AppComponent } from './app.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';



@NgModule({
  declarations: [
    AppComponent,
    
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
