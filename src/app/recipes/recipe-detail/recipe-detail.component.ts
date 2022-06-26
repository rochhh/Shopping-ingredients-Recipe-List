import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }






  // recipe: Recipe;
  // id : number ;
  // constructor( private recipeService : RecipeService ,
  //              private route : ActivatedRoute ,
  //              private router : Router ) { }

  // ngOnInit(){
  //   this.route.params.subscribe(
  //     (params : Params) => { 
  //       this.id = +params['id'];
  //       this.recipe = this.recipeService.getRecipe(this.id)
  //      }
  //   )  
  // }

  // onEditRecipe(){
  //   this.router.navigate( ['edit'] , { relativeTo :this.route  } )
  // }

  // onAddToShoppingList(){
  //   this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  // }

  /**
   * 
   *    i tried routerlink on <a> for /recipes/edit but it didn't work , this is the correct solution
   * 
   * lengthy way to go to /recipes/new but the correct way 
   *  
   *  in html -> (click)= "onEdit()"
   * 
   *  inject router(this is for navigation) its diff from activated router(this is for params)
   * 
   *  in ts ->  onEdit(){
   *  
   *    this.router.navigate( ['edit'] , { relativeTo : this.router } )  
   *      }
   * 
   */


}
