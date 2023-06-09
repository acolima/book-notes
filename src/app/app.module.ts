import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ContentComponent } from "./pages/content/content.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchBookComponent } from "./pages/search-book/search-book.component";
import { BookResultComponent } from "./pages/search-book/book-result/book-result.component";
import { AppRoutingModule } from "./app-routing.module";
import { BookComponent } from "./pages/book/book.component";
import { AuthComponent } from "./pages/auth/auth.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContentComponent,
    SearchBookComponent,
    BookResultComponent,
    BookComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
