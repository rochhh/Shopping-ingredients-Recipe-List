import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  recipesChanged = new Subject<Recipe[]>();

  private baseUrl = "http://localhost:4200/recipes "
  
  private recipes : Recipe[] = [
    new Recipe('Pizza' , 'Pizza is yummy' , 'https://i.kym-cdn.com/entries/icons/original/000/037/642/k-photo-u1.jpg' , [ 
      new Ingredient('dough' , 1)
    ] ),
    new Recipe('Burger' , 'Borgir is yummy' , 'https://coub-attachments.akamaized.net/coub_storage/coub/simple/cw_image/c94ce16c3db/d32faa8b583ae92341477/med_1629198351_00026.jpg' , [
      new Ingredient('tomato' , 4)
    ] )
          
  ];

  // getRecipe( id: number ){
  //   return this.recipes[id]
  // }

  // getRecipes(){
  //   return this.recipes.slice();
  // }

  // addIngredientsToShoppingList( ingredient: Ingredient[] ){
  //   this.slService.addIngredients(ingredient);
  // }

  constructor( private slService : ShoppingListService ) { }


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes : Recipe[] ) { 
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

}
