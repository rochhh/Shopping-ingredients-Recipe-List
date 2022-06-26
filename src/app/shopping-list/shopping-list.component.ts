import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy {

  private subscription : Subscription;
  ingredients : Ingredient[] = [];

  constructor( private slService : ShoppingListService ) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getingredients();
    this.subscription=this.slService.ingredientsChanged.subscribe(
      ingredient => this.ingredients=ingredient
    )
  }

  onEditItem( index : number ){
    this.slService.startedEditing.next(index)  // passing data through the index in the loop to the service which can later be subscribed to the shopping-edit component
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
