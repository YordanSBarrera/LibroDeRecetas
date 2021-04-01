import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  idRecipeChange: Subscription;

  constructor(
    private recipeService: RecipeService,
    private enrutador: Router,
    private ruta: ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.idRecipeChange = this.recipeService.recipesObservable.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  nuevaReceta() {
    this.enrutador.navigate(['new'], { relativeTo: this.ruta });
  }
  consoletest() {
    console.log('lista-> ' + this.recipeService.getRecipes());
  }

  ngOnDestroy(){
    this.idRecipeChange.unsubscribe();
  }
}
