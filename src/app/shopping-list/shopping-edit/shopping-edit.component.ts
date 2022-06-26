import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {


  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}  


  // id: number;
  // editMode = false;
  // recipeForm: FormGroup;

  // constructor(private route: ActivatedRoute,
  //             private recipeService: RecipeService,
  //             private router: Router) {
  // }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  // ngOnInit() {
  //   this.route.params
  //     .subscribe(
  //       (params: Params) => {
  //         this.id = +params['id'];
  //         this.editMode = params['id'] != null;
  //         this.initForm();
  //       }
  //     );
  // }

  // onSubmit() {
  //   // const newRecipe = new Recipe(
  //   //   this.recipeForm.value['name'],
  //   //   this.recipeForm.value['description'],
  //   //   this.recipeForm.value['imagePath'],
  //   //   this.recipeForm.value['ingredients']);
  //   if (this.editMode) {
  //     this.recipeService.updateRecipe(this.id, this.recipeForm.value);
  //   } else {
  //     this.recipeService.addRecipe(this.recipeForm.value);
  //   }
  //   this.onCancel();
  // }

  // onAddIngredient() {
  //   (<FormArray>this.recipeForm.get('ingredients')).push(
  //     new FormGroup({
  //       'name': new FormControl(null, Validators.required),
  //       'amount': new FormControl(null, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ])
  //     })
  //   );
  // }

  // onDeleteIngredient(index: number) {
  //   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  // }

  // onCancel() {
  //   this.router.navigate(['../'], {relativeTo: this.route});
  // }

  // private initForm() {
  //   let recipeName = '';
  //   let recipeImagePath = '';
  //   let recipeDescription = '';
  //   let recipeIngredients = new FormArray([]);

  //   if (this.editMode) {
  //     const recipe = this.recipeService.getRecipe(this.id);
  //     recipeName = recipe.name;
  //     recipeImagePath = recipe.imagePath;
  //     recipeDescription = recipe.description;
  //     if (recipe['ingredients']) {
  //       for (let ingredient of recipe.ingredients) {
  //         recipeIngredients.push(
  //           new FormGroup({
  //             'name': new FormControl(ingredient.name, Validators.required),
  //             'amount': new FormControl(ingredient.amount, [
  //               Validators.required,
  //               Validators.pattern(/^[1-9]+[0-9]*$/)
  //             ])
  //           })
  //         );
  //       }
  //     }
  //   }

  //   this.recipeForm = new FormGroup({
  //     'name': new FormControl(recipeName, Validators.required),
  //     'imagePath': new FormControl(recipeImagePath, Validators.required),
  //     'description': new FormControl(recipeDescription, Validators.required),
  //     'ingredients': recipeIngredients
  //   });




//  editedItemIndex : number;
//  editMode = false;
//  subscription : Subscription;
//  editedItem : Ingredient;
//  recipeForm : FormGroup;

//  @ViewChild('form' , {static:false} ) slForm  : NgForm ;
  
//   constructor( private slService : ShoppingListService ) { }

//   ngOnInit(): void {
//     this.subscription=this.slService.startedEditing.subscribe(
//       index => {
//       this.editedItemIndex=index
//       this.editMode=true
//       this.editedItem =this.slService.getIngredient(index)
//       this.slForm.setValue({
//         name : this.editedItem.name,
//         amount : this.editedItem.amount
//       })
//       }
//     )
//   }

//   private init(){
//     this.recipeForm = new FormGroup({})
//   }

//   ngOnDestroy(): void {
//   this.subscription.unsubscribe();    
//   }

//   onSubmit( form : NgForm ){
//     const value = form.value;
//     const newIngredient = new Ingredient( value.name , value.amount ) 
//     if (this.editMode){
//       this.slService.updateIngredient( this.editedItemIndex , newIngredient )
//     }else{
//     this.slService.addIngredient(newIngredient);
//     } 
//     this.editMode=false;
//     form.reset();
//   }

//   onClear(){
//     this.slForm.reset();
//     this.editMode=false
//   }

//   onDelete(){
//     this.slService.deleteIngredient(this.editedItemIndex);
//     this.onClear();
//   }

 


