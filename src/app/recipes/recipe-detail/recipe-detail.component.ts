import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private enrutador: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (parametro: Params) => {
          this.id = +parametro['id'];
          this.recipe = this.recipeService.getRecipesByID(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipes() {
   // this.enrutador.navigate(['edit'], { relativeTo: this.route });
    this.enrutador.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDelete(){
    this.recipeService.deleleRecipe(this.id);
    this.enrutador.navigate(['../'],{relativeTo:this.route});
  }

}
