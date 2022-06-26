import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown-directive';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { RouterModule, Routes } from '@angular/router';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { HttpClientModule }  from '@angular/common/http';
import { AuthComponent } from './auth/auth.component'
import { LoadingSpinnercomponent } from './shared/loading-spinner/loading-spinner.component';


const routes : Routes = [
  {path : '' , redirectTo: '/recipes' , pathMatch:'full' },
  {path : 'recipes' , component: RecipesComponent , children : [
    { path : '' , component:RecipeStartComponent },
    { path : 'new', component : RecipeEditComponent },
    { path : ':id' , component: RecipeDetailComponent },
    { path : ':id/edit', component : RecipeEditComponent },
  ] },
  {path : 'shopping-list' , component: ShoppingListComponent },
  { path : 'auth' , component : AuthComponent  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnercomponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [RecipeService , ShoppingListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
