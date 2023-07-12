import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchBookComponent } from "./pages/search-book/search-book.component";
import { ContentComponent } from "./pages/content/content.component";
import { BookComponent } from "./pages/book/book.component";
import { AuthComponent } from "./pages/auth/auth.component";

const routes: Routes = [
  { path: "", component: AuthComponent },
  { path: "search", component: SearchBookComponent },
  { path: "read", component: ContentComponent },
  { path: "reading", component: ContentComponent },
  { path: "to-read", component: ContentComponent },
  { path: "book/:id", component: BookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
