import { Injectable  } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients : Ingredient[] = [
    new Ingredient('Cheese' , 10),
    new Ingredient('sauce' , 200 ),
  ];

  getingredients (){
    return this.ingredients.slice();
  }

  getIngredient(index : number){
    return this.ingredients[index]   // as ingredients is an array so arr[i]
  }

  addIngredient ( ingredient : Ingredient ){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients ( ingredients : Ingredient[] ){

    // can also use for (let ingredient of ingredients){
    //  this.addIngredient(ingredients)
    //     }

    this.ingredients.push( ...ingredients )
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  // editIngredientList( index : number ){

  // }


  updateIngredient ( index : number , newIngredient : Ingredient ){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient( index : number ){
    this.ingredients.splice(index , 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  constructor() { }
}
